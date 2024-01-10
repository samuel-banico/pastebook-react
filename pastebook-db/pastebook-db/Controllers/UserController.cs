using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.PasswordHash;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IPasswordHash _passwordHasher;
        private readonly FriendRepository _friendRepository;

        public UserController(UserRepository userRepository, IPasswordHash passwordHasher, FriendRepository friendRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _friendRepository = friendRepository;
        }

        [HttpGet]
        public ActionResult<List<UserSendDTO>> GetAllUser() 
        {
            var userList = _userRepository.GetAllUsers();


            if(userList == null || userList.Count == 0)
                return BadRequest(new { result = "user_not_found" });

            var userSendDTOList = new List<UserSendDTO>();
            foreach (var user in userList) 
            {
                var userDTO = _friendRepository.ConvertUserToUserSendDTO(user);
                userSendDTOList.Add(userDTO);
            }

            return Ok(userSendDTOList);
        }

        [HttpGet("{id}")]
        public ActionResult<List<UserSendDTO>> GetUserById(Guid id)
        {
            var user = _userRepository.GetUserById(id);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(user);

            return Ok(userDTO);
        }

        [HttpGet("userIdFromToken")]
        public ActionResult<UserSendDTO> GetUserByToken() 
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(user);

            return Ok(userDTO);
        }

        [HttpGet("userIdFromTokenHome")]
        public ActionResult<UserSendDTO> GetUserByTokenHome()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTOHome(user);

            return Ok(userDTO);
        }

        [HttpGet("getPassword")]
        public ActionResult<bool> GetUserPasswordById(string password)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            if (!_passwordHasher.VerifyPassword($"{password}_{user.Salt}", user.Password))
                return Unauthorized(new { result = "password_incorrect" });

            return Ok(true);
        }

        // To edit
        [HttpGet("getProfilePic")]
        public ActionResult<byte[]> GetUsersprofilePic() 
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            return Ok();
        }

        [HttpPut("editUserGeneral")]
        public ActionResult<User> EditUserGeneral([FromBody] EditUserReceiveGeneralDTO user)
        {
            var token = Request.Headers["Authorization"];
            var retreivedUser = _userRepository.GetUserByToken(token);

            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            retreivedUser.FirstName = user.FirstName;
            retreivedUser.LastName = user.LastName;
            retreivedUser.Birthday = DateTime.Parse(user.Birthday);
            retreivedUser.Gender = (Gender)user.Gender;
            retreivedUser.ViewPublicPost = user.ViewPublic;

            if (!_userRepository.UpdateUser(retreivedUser, false))
                return BadRequest(new { result = "not_legitimate_email" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(retreivedUser);

            return Ok(userDTO);
        }

        [HttpPut("editUserSecurity")]
        public ActionResult<User> EditUserSecurity([FromBody] EditUserReceiveSecurityDTO user)
        {
            var token = Request.Headers["Authorization"];
            var retreivedUser = _userRepository.GetUserByToken(token);
            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            bool emailHasBeenEdited = false;
            if(!retreivedUser.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase))
                emailHasBeenEdited = true;

            retreivedUser.Email = user.Email;
            retreivedUser.MobileNumber = user.MobileNumber;

            if(user.Password != null && user.Password != "")
                retreivedUser.Password = _passwordHasher.HashPassword($"{user.Password}_{retreivedUser.Salt}");

            if (!_userRepository.UpdateUser(retreivedUser, emailHasBeenEdited))
                return BadRequest(new { result = "not_legitimate_email" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(retreivedUser);

            return Ok(userDTO);
        }

        [HttpPut("editUserProfilePicture")]
        public ActionResult<User> EditUserProfile(IFormFile image)
        {
            var token = Request.Headers["Authorization"];
            var retreivedUser = _userRepository.GetUserByToken(token);
            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            retreivedUser.ProfilePicture = HelperFunction.SaveImageToLocalStorage(image);

            if (!_userRepository.UpdateUser(retreivedUser, false))
                return BadRequest(new { result = "not_legitimate_email" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(retreivedUser);

            return Ok(userDTO);
        }

        [HttpPut("editUserProfileBio")]
        public ActionResult<User> EditUserProfileBio(EditUserBioDTO userBio)
        {
            var token = Request.Headers["Authorization"];
            var retreivedUser = _userRepository.GetUserByToken(token);

            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            retreivedUser.UserBio = userBio.UserBio;

            if (!_userRepository.UpdateUser(retreivedUser, false))
                return BadRequest(new { result = "not_legitimate_email" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(retreivedUser);

            return Ok(userDTO);
        }


    }
}
