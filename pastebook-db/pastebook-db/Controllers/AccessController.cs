using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.PasswordHash;
using pastebook_db.Services.Token.TokenData;
using pastebook_db.Services.Token.TokenGenerator;
using pastebook_db.Services.Token.TokenValidator;
using System.Security.Claims;

namespace pastebook_db.Controllers
{
    [Route("api/access")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly AccessRepository _accessRepository;
        private readonly UserRepository _userRepository;

        private readonly IPasswordHash _hashPassword;
        private readonly TokenController _tokenController;
        private readonly ValidateToken _validateToken;

        public AccessController(IPasswordHash hashPassword, AccessRepository accessRepository, UserRepository userRepository, TokenController tokenController, ValidateToken validateToken)
        {
            _hashPassword = hashPassword;
            _accessRepository = accessRepository;
            _userRepository = userRepository;
            _tokenController = tokenController;
            _validateToken = validateToken;
        }

        [HttpGet("validateToken")]
        public ActionResult<bool> ValidateToken() 
        {
            var token = Request.Headers["Authorization"];
            bool result = _validateToken.Validate(token);

            return Ok(result);
        }

        [HttpPost("login")]
        public ActionResult<UserLoginResponse> Login(UserLoginDTO userLogin)
        {
            try 
            { 
                if (string.IsNullOrEmpty(userLogin.Email) || string.IsNullOrEmpty( userLogin.Password))
                return BadRequest(new { result = "empty_field" });

                var user = _userRepository.GetUserByEmail(userLogin.Email);

                if (user == null)
                    return Unauthorized(new { result = "incorrect_credentials" });

                if (!_hashPassword.VerifyPassword($"{userLogin.Password}_{user.Salt}", user.Password))
                    return Unauthorized(new { result = "incorrect_credentials" });

                var createdtoken = _tokenController.Authenticate(user);

                var userLoginResponse = new UserLoginResponse
                {
                    email = user.Email,
                    id = user.Id,
                    token = createdtoken
                };

                user.IsCurrentlyActive = true;
                _userRepository.UpdateUser(user, false);

                return Ok(userLoginResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error retrieving log in credentials: " + ex.Message);
                return StatusCode(500, "An error occurred while retrieving log in credentials.");
            }
        }

        [HttpPost("register")]
        public ActionResult<User> Register(UserReceiveDTO userRegister)
        {
            var existingUser = _userRepository.GetUserByEmail(userRegister.Email);
            if (existingUser != null)
                return BadRequest(new { result = "user_already_exist" });

            var generatedSalt = HelperFunction.GenerateRandomString();
            var newUser = new User
            {
                FirstName = userRegister.FirstName,
                LastName = userRegister.LastName,
                Email = userRegister.Email,
                Password = _hashPassword.HashPassword($"{userRegister.Password}_{generatedSalt}"),
                Birthday = DateTime.Parse(userRegister.Birthday),
                Gender = (Gender)userRegister.Gender,
                MobileNumber = userRegister.MobileNumber,
                ProfilePicture = HelperFunction.SaveImageToLocalStorage(null),
                UserBio = "Hi, Everyone! I am new to Pastebook.",

                ViewPublicPost = false,
                IsCurrentlyActive = false,
                Salt = generatedSalt
            };

            if (!_accessRepository.RegisterUser(newUser))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "registered" });
        }

        [HttpPut("watch")]
        public IActionResult Watch() 
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var watch = Request.Query["watch"].ToString();

            if (watch == "idle")
                user.IsCurrentlyActive = false;
            else if (watch == "active")
                user.IsCurrentlyActive = true;
            else
                return BadRequest();

            _userRepository.UpdateUser(user, false);

            return Ok();
        }

        [HttpDelete("logout")]
        public IActionResult Logout()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            _tokenController.DeleteAll(user.Id);

            user.IsCurrentlyActive = false;
            _userRepository.UpdateUser(user, false);

            return NoContent();
        }
    }
}
