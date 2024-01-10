using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/friendRequest")]
    [ApiController]
    public class FriendRequestController : ControllerBase
    {
        private readonly FriendRequestRepository _friendRequestRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;

        public FriendRequestController(FriendRequestRepository friendRequestRepository, NotificationRepository notificationRepository, UserRepository userRepository, FriendRepository friendRepository)
        {
            _friendRequestRepository = friendRequestRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
        }

        [HttpGet("sentRequest")]
        public ActionResult<Friend> HasSendFriendRequest()
        {
            var userReq = Request.Query["userToken"];
            var user = _userRepository.GetUserByToken(userReq);

            var friendReq = Request.Query["friendId"];
            var friendId = Guid.Parse(friendReq);

            bool friends = false;
            var friendship = _friendRequestRepository.HasSentRequest(user.Id, friendId);

            if (friendship != null)
                friends = true;

            return Ok(friends);
        }

        [HttpGet("allRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequestsByUserId()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var request = _friendRequestRepository.GetAllFriendRequest(user.Id);

            List<FriendRequestDTO> friendRequests = new List<FriendRequestDTO>();

            if (request.Count == 0)
                return Ok(friendRequests);

            foreach (var r in request) 
            {
                friendRequests.Add(_friendRepository.ConvertFriendRequestToDTO(r));
            }

            return Ok(friendRequests);
        }

        [HttpPost("request")]
        public ActionResult<FriendRequest> FriendRequest(Guid Id)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var friendRequest = new FriendRequest();
            friendRequest.UserId = user.Id;
            friendRequest.User_FriendId = Id;
            friendRequest.CreatedOn = DateTime.Now;
            _friendRequestRepository.RequestFriend(friendRequest);

            _notificationRepository.CreateNotifFriendRequest(friendRequest);

            return Ok(new { result = "request_sent", friendRequest });
        }

        [HttpDelete("reject")]
        public ActionResult<FriendRequest> RejectFriendReq()
        {
            var friendReqId = Guid.Parse(Request.Query["friendRequestId"]);
            _friendRequestRepository.DeleteFriendRequest(friendReqId);
            return Ok(new { result = "friend_request_rejected" });
        }
    }
}
