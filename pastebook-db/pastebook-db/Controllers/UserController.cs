using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.PasswordHash;
using pastebook_db.Services.Token.TokenData;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IPasswordHash _passwordHasher;
        private readonly FriendRepository _friendRepository;
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly HomeRepository _homeRepository;
        private readonly TokenController _tokenController;

        public UserController(UserRepository userRepository, IPasswordHash passwordHasher, FriendRepository friendRepository, TokenController tokenController, FriendRequestRepository friendRequestRepository, HomeRepository homeRepository)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _friendRepository = friendRepository;
            _tokenController = tokenController;
            _friendRequestRepository = friendRequestRepository;
            _homeRepository = homeRepository;
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

        [HttpPost("getUserById")]
        public ActionResult<List<UserSendDTO>> GetUserHomeDTOById(IdReceived received)
        {
            var user = _userRepository.GetUserById(received.Id);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            var userDTO = _homeRepository.GetUserHomeDTO(user);

            return Ok(userDTO);
        }

        [HttpGet("getUserEmailByToken")]
        public ActionResult<UserSendDTO> GetUserEmailByToken()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            return Ok(user.Email);
        }

        [HttpGet("userIdFromToken")]
        public ActionResult<UserSendDTO> getUserIdbyToken() 
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTO(user);

            return Ok(userDTO);
        }

        [HttpGet("userIdFromTokenHome")]
        public ActionResult<UserSendDTO> GetUserByTokenHome()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userDTO = _friendRepository.ConvertUserToUserSendDTOHome(user);

            return Ok(userDTO);
        }

        [HttpPost("getUserRelationship")]
        public ActionResult<UserSendDTO> GetUserRelationship(IdReceived visitedUser)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            if (user.Id == visitedUser.Id)
                return Ok(new { result = "own" });

            if(_friendRequestRepository.HasSentRequest(user.Id, visitedUser.Id) != null)
                return Ok(new { result = "sent" });

            if(_friendRepository.GetFriendById(user.Id, visitedUser.Id) != null)
                return Ok(new { result = "friend" });
            else
                return Ok(new { result = "not_friend" });
        }

        [HttpPost("getProfileUserDetails")]
        public ActionResult<UserSendDTO> GetProfileUserDetails(IdReceived received)
        {
            var user = _userRepository.GetUserById(received.Id);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userToSend = new ProfileUser
            {
                Id = user.Id,
                Bio = user.UserBio,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday.ToString("yyyy-MM-dd"),
                Gender = (int)user.Gender,
                MobileNumber = user.MobileNumber,
            };

            userToSend.ProfilePicture = HelperFunction.PictureExists(user.ProfilePicture, 
                Path.Combine("wwwroot", "images", "default.png"));

            return Ok(userToSend);
        }

        [HttpGet("getProfileUserDetailsByToken")]
        public ActionResult<UserSendDTO> GetProfileUserDetailsByToken()
        {

            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var userToSend = new ProfileUser
            {
                Id = user.Id,
                Bio = user.UserBio,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Birthday = user.Birthday.ToString("yyyy-MM-dd"),
                Gender = (int)user.Gender,
                MobileNumber = user.MobileNumber,
            };

            userToSend.ProfilePicture = HelperFunction.PictureExists(user.ProfilePicture,
                Path.Combine("wwwroot", "images", "default.png"));

            return Ok(userToSend);
        }

        // To edit
        [HttpGet("getProfilePic")]
        public ActionResult<byte[]> GetUsersprofilePic() 
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            return Ok();
        }

        [HttpGet("settingsGetUserData")]
        public ActionResult<bool> SettingsGetUserData()
        {
            var token = Request.Headers["Authorization"];
            if (string.IsNullOrWhiteSpace(token))
                return BadRequest(new { result = "Something is wrong" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });
            
            return Ok(new SettingsUserSend 
            {
                UserId = user.Id,
                ProfilePicture = HelperFunction.SendImageToAngular(user.ProfilePicture),
                Fullname = $"{user.FirstName} {user.LastName}",
                ViewPublicPost = user.ViewPublicPost
            });
        }

        [HttpPost("getPassword")]
        public ActionResult<bool> GetUserPasswordById(UserConfirmPassword password)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            if (!_passwordHasher.VerifyPassword($"{password.Password}_{user.Salt}", user.Password))
                return Unauthorized(new { result = "password_incorrect" });

            return Ok(true);
        }

        [HttpPost("updateProfile")]
        public ActionResult<User> UpdateProfile(ProfileUser receivedUser)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            if (!string.IsNullOrWhiteSpace(receivedUser.Bio))
                user.UserBio = receivedUser.Bio;

            if (!string.IsNullOrWhiteSpace(receivedUser.FirstName))
                user.FirstName = receivedUser.FirstName;

            if (!string.IsNullOrWhiteSpace(receivedUser.LastName))
                user.LastName = receivedUser.LastName;

            if (!string.IsNullOrWhiteSpace(receivedUser.Birthday))
                user.Birthday = DateTime.Parse(receivedUser.Birthday);

            user.Gender = (Gender)receivedUser.Gender;

            try
            {
                _userRepository.UpdateUser(user, false);
            }
            catch (Exception e)
            {
                return BadRequest(new { result = e.Message });
            }

            return Ok();
        }

        [HttpPut("editUserGeneral")]
        public ActionResult<User> EditUserGeneral([FromBody] EditUserReceiveGeneralDTO user)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var retreivedUser = _userRepository.GetUserById(userId);

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

        [HttpPut("toggleViewPublic")]
        public ActionResult<User> ToggleViewPublic(ViewPublicReceive toggle)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "user_not_found" });

            user.ViewPublicPost = toggle.ViewPublic;

            _userRepository.UpdateUser(user, false);

            return Ok();
        }

        [HttpPost("updateUserSecurity")]
        public ActionResult<User> UpdateUserSecurity(SecurityUser user)
        {
            if (string.IsNullOrWhiteSpace(user.Email) && string.IsNullOrWhiteSpace(user.Password))
                return Ok();

            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var retreivedUser = _userRepository.GetUserById(userId);

            if (retreivedUser == null)
                return BadRequest(new { result = "user_not_found" });

            bool emailHasBeenEdited = false;
            if (!string.IsNullOrWhiteSpace(user.Email)) 
            {
                var existingUser = _userRepository.GetUserByEmail(user.Email);
                if (existingUser != null)
                    return BadRequest(new { result = "email_taken" });

                if (!retreivedUser.Email.Equals(user.Email, StringComparison.CurrentCultureIgnoreCase))
                    emailHasBeenEdited = true;

                retreivedUser.Email = user.Email;
            }

            if (!string.IsNullOrWhiteSpace(user.Password))
                retreivedUser.Password = _passwordHasher.HashPassword($"{user.Password}_{retreivedUser.Salt}");


            if (!_userRepository.UpdateUser(retreivedUser, emailHasBeenEdited))
                return BadRequest(new { result = "not_legitimate_email" });

            return Ok(new { result = "updated security"});
        }


        [HttpPut("editUserSecurity")]
        public ActionResult<User> EditUserSecurity([FromBody] EditUserReceiveSecurityDTO user)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var retreivedUser = _userRepository.GetUserById(userId);

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

        [HttpPost("editUserProfilePicture")]
        public ActionResult<User> EditUserProfile(IFormFile image)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var retreivedUser = _userRepository.GetUserById(userId);

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
            var userId = _tokenController.DecodeJwtToken(token);
            var retreivedUser = _userRepository.GetUserById(userId);

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
