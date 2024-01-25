using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;
using System.Diagnostics;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/home")]
    public class HomeController : Controller
    {
        private readonly HomeRepository _homeRepository;
        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;
        private readonly TokenController _tokenController;
        private readonly NotificationRepository _notificationRepository;
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly PostRepository _postRepository;

        public HomeController(HomeRepository repo, UserRepository userRepository, FriendRepository friendRepository, TokenController tokenController, NotificationRepository notificationRepository, FriendRequestRepository friendRequestRepository, PostRepository postRepository)
        {
            _homeRepository = repo;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
            _tokenController = tokenController;
            _notificationRepository = notificationRepository;
            _friendRequestRepository = friendRequestRepository;
            _postRepository = postRepository;
        }

        // Search Modal
        [HttpPost("searchUser")]
        public ActionResult<IEnumerable<UserSendDTO>?> SearchUserByString(UserSearch user)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var loggedUser = _userRepository.GetUserById(userId);

            if (loggedUser == null)
                return BadRequest(new { result = "no_user" });

            var users = _homeRepository.GetSearchedUser(user.Username, loggedUser.Id).Take(5);

            var userList = new List<UserSendDTO>();

            foreach (var u in users)
            {
                userList.Add(_friendRepository.ConvertUserToUserSendDTO(u));
            }

            userList = _userRepository.SortUserDTOByFullName(userList);

            return Ok(userList);
        }
        
        // Search Page
        [HttpPost("searchAllUsers")]
        public ActionResult<IEnumerable<UserSendDTO>?> SearchAllUsersByString(UserSearch user)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var loggedUser = _userRepository.GetUserById(userId);

            if (loggedUser == null)
                return BadRequest(new { result = "no_user" });

            var users = _homeRepository.GetSearchedUser(user.Username, loggedUser.Id);

            var userList = new List<UserHomeDTO>();

            foreach (var searchUser in users)
            {
                userList.Add(_homeRepository.GetUserHomeDTO(searchUser));
            }

            userList = userList.OrderBy(u => ($"{u.Fullname}")).ToList();

            return Ok(userList);
        }

        [HttpGet("getFriendReqCount")]
        public ActionResult<int> GetFriendRequestCount() 
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var loggedUser = _userRepository.GetUserById(userId);

            if (loggedUser == null)
                return BadRequest(new { result = "no_user"});

            var friendRequestCount = _homeRepository.GetFriendRequestCount(loggedUser.Id);

            return Ok(friendRequestCount);
        }

        [HttpGet("getNotifCount")]
        public ActionResult<int> GetNotificationCount()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var loggedUser = _userRepository.GetUserById(userId);

            if (loggedUser == null)
                return BadRequest(new { result = "no_user"});

            var unseenNotifCount = _homeRepository.GetUnseenNotificationCount(loggedUser.Id);

            return Ok(unseenNotifCount);
        }

        [HttpGet("getHomeDetails")]
        public ActionResult<Home> GetHomeDetails()
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var Home = new Home();

            // get User Profile
            Home.User = _homeRepository.GetUserHomeDTO(user);

            // get Online Friends
            List<User> onlineFriends = _friendRepository.GetAllOnlineFriends(user);
            List<UserHomeDTO> friendList = new();

            foreach (var friend in onlineFriends)
            {
                friendList.Add(_homeRepository.GetUserHomeDTO(friend));
            }

            Home.OnlineFriends = friendList;

            // get Posts
            Home.Feed = _homeRepository.GetFeed(user);

            // get usernotifcation
            Home.HasNotification = _notificationRepository.GetHasNotification(user.Id);

            // get user friendrequest
            Home.HasFriendRequest = _friendRequestRepository.GetHasFriendRequest(user.Id);
            
            return Ok(Home);
        }

        // HELPER METHODS
    }
}