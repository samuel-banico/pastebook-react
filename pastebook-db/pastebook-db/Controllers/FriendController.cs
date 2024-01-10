using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/friend")]
    public class FriendController : Controller
    {
        private readonly FriendRepository _friendRepository;
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;

        public FriendController(FriendRepository repo, NotificationRepository notificationRepository, FriendRequestRepository friendRequestRepository, UserRepository userRepository)
        {
            _friendRepository = repo;
            _notificationRepository = notificationRepository;
            _friendRequestRepository = friendRequestRepository;
            _userRepository = userRepository;
        }

        [HttpGet("friend")]
        public ActionResult<Friend> IsFriends() 
        {
            var userReq = Request.Query["userToken"];
            var user = _userRepository.GetUserByToken(userReq);

            var friendReq = Request.Query["friendId"];
            var friendId = Guid.Parse(friendReq);

            bool friends = false;
            var friendship = _friendRepository.GetFriendship(user.Id, friendId);

            if (friendship != null)
                friends = true;

            return Ok(friends);
        }

        // returns a list of friends table
        [HttpGet("friendList")]
        public ActionResult<List<Friend>> GetAllFriends(Guid userId)
        {
            var friend = _friendRepository.GetAllFriends(userId);

            if (friend == null)
                return NotFound(new { result = "no_friends" });

            return Ok(friend);

        }

        // returns a list of user table
        [HttpGet("userFriendList")]
        public ActionResult<List<UserSendDTO>> GetAllUserFriends()
        {
            List<User>? userFriend = new();

            var use = Request.Query["use"].ToString();

            if (use == "id")
            {
                var id = Request.Query["userId"];
                Guid userId = Guid.Parse(id);
                userFriend = _friendRepository.GetAllUserFriends(userId);
            }
            else if (use == "token")
            {
                var token = Request.Query["userId"];
                var user = _userRepository.GetUserByToken(token);
                userFriend = _friendRepository.GetAllUserFriends(user.Id);
            }
            else
                return BadRequest();
            

            if(userFriend == null)
                return NotFound(new { result = "no_friends" });

            List<UserSendDTO> friendList = new();
            foreach (var friend in userFriend) 
            {
                friendList.Add(_friendRepository.ConvertUserToUserSendDTO(friend));
            }

            return Ok(friendList);
        }

        [HttpGet("blocked")]
        public ActionResult<Friend> GetBlockedFriends(Guid userId)
        {
            var blockedUsers = _friendRepository.GetAllBlockedFriends(userId);

            if (blockedUsers.Count == 0)
                return NotFound(new { result = "no_blocked" });

            return Ok(new { result = "blocked_users", blockedUsers });
        }

        [HttpPost("accepted")]
        public ActionResult<Friend> AddFriend(Guid friendRequestId)
        {
            var request = _friendRequestRepository.GetFriendRequest(friendRequestId);
            var addFriend = new Friend();
            addFriend.UserId = request.UserId;
            addFriend.User_FriendId = request.User_FriendId;
            addFriend.IsBlocked = false;
            addFriend.CreatedOn = DateTime.Now;

            _friendRequestRepository.AddedFriend(addFriend, request);

            _notificationRepository.CreateNotifAcceptedFriendRequest(addFriend.UserId, addFriend.User_FriendId);

            return Ok(new { result = "request_accepted", request});
        }

        [HttpPut]
        public ActionResult<Friend> BlockFriend(Guid friendId, Guid userId)
        {
            var userToBlock = _friendRepository.GetFriendship(userId, friendId);

            if (userToBlock == null)
                return NotFound(new { result = "not_friend" });

            userToBlock.IsBlocked = true;

            _friendRepository.UpdateFriend(userToBlock);

            return Ok(new { result = "blocked_user"});
        }
        
        // editing
        [HttpDelete]
        public ActionResult<Friend> RemoveFriend(Guid friendId, Guid userId)
        {
            var userToDelete = _friendRepository.GetFriendship(userId, friendId);

            if (userToDelete == null)
                return NotFound(new { result = "not_friend" });

            _friendRepository.DeleteFriend(userToDelete);

            return Ok(new { result = "deleted_friend" });
        }
    }
}
