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
                return BadRequest(new { result = "no_user" });

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
                return BadRequest(new { result = "no_user" });

            var unseenNotifCount = _homeRepository.GetUnseenNotificationCount(loggedUser.Id);

            return Ok(unseenNotifCount);
        }

        [HttpGet("getNavbarRequest")]
        public ActionResult<NavbarRequestToSend> getNavbarRequest()
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            return Ok(new NavbarRequestToSend
            {
                HasFriendRequest = _friendRequestRepository.GetHasFriendRequest(user.Id),
                HasNotification = _notificationRepository.GetHasNotification(user.Id)
            });
        }

        [HttpGet("getOnlineFriends")]
        public ActionResult<List<Guid>> GetOnlineFriends()
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            List<User> onlineFriends = _friendRepository.GetAllOnlineFriends(user);
            List<Guid> friendList = new();

            foreach (var friend in onlineFriends)
                friendList.Add(friend.Id);

            return Ok(friendList);
        }

        [HttpGet("getFeedPosts")]
        public ActionResult<List<Guid>> GetFeedPosts()
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var posts = _homeRepository.GetFeed(user);
            List<Guid> postIdList = new();

            foreach (var post in posts)
                postIdList.Add(post.Id);

            return Ok(postIdList);
        }

        [HttpGet("getHomeUserData")]
        public ActionResult<UserHomeDTO> GetHomeDetails()
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            return Ok(_homeRepository.GetUserHomeDTO(user));
        }

        [HttpPost("getOnlineFriendById")]
        public ActionResult<List<UserHomeDTO>> GetOnlineFriendById (IdReceived friendId)
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var friend = _userRepository.GetUserById(friendId.Id);

            if (friend == null)
                return BadRequest(new { result = "not_friend" });

            return Ok(_homeRepository.GetUserHomeDTO(friend));
        }

        [HttpPost("getFeedPostById")]
        public ActionResult<List<UserHomeDTO>> GetFeedPostById(IdReceived postId)
        {
            var token = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
                return Unauthorized(new { result = "no_token" });

            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var getPost = _postRepository.GetPostById(postId.Id);

            if (getPost == null)
                return BadRequest(new { result = "no_post" });

            var post = _homeRepository.PostToSimpleDTO(getPost, user.Id);

            return Ok(post);
        }
    }
}