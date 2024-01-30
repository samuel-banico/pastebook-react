using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Common;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

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
        private readonly TokenController _tokenController;

        public FriendRequestController(FriendRequestRepository friendRequestRepository, NotificationRepository notificationRepository, UserRepository userRepository, FriendRepository friendRepository, TokenController tokenController)
        {
            _friendRequestRepository = friendRequestRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _friendRepository = friendRepository;
            _tokenController = tokenController;
        }

        [HttpGet("sentRequest")]
        public ActionResult<Friend> HasSendFriendRequest(IdReceived received)
        {
            var userReq = Request.Query["userToken"];
            var userId = _tokenController.DecodeJwtToken(userReq);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var friend = _userRepository.GetUserById(received.Id);

            if(friend == null)
                return BadRequest(new { result = "no_friend" });


            bool friends = false;
            var friendship = _friendRequestRepository.HasSentRequest(user.Id, friend.Id);

            if (friendship != null)
                friends = true;

            return Ok(friends);
        }

        [HttpGet("allRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequestsByUserId()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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

        [HttpGet("getAllFriendRequest")]
        public ActionResult<FriendRequest> GetAllFriendRequest()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var request = _friendRequestRepository.GetAllFriendRequest(user.Id);

            if (request.Count == 0)
                return Ok(new List<Guid>());

            var friendRequests = new List<Guid>();
            foreach (var r in request)
                friendRequests.Add(r.Id);

            friendRequests.Reverse();

            return Ok(friendRequests);
        }

        [HttpPost("getFriendRequestDetailsById")]
        public ActionResult<FriendRequest> GetFriendRequestDetailsById(IdReceived received)
        {
            var friendRequest = _friendRequestRepository.GetFriendRequest(received.Id);

            if (friendRequest == null)
                return BadRequest(new { result = "not_friends"});

            var dataToSend = new FriendDetailsInFriendRequest
            {
                DateCreated = HelperFunction.TimeDifference(friendRequest.CreatedOn, DateTime.Now),
                RequestedUser = new UserHomeDTO 
                {
                    UserId = friendRequest.User.Id,
                    Fullname = $"{friendRequest.User.FirstName} {friendRequest.User.LastName}"
                }
            };

            if(friendRequest.User.ProfilePicture != null)
                dataToSend.RequestedUser.ProfilePicture = HelperFunction.PictureExists(friendRequest.User.ProfilePicture, Path.Combine("wwwroot", "images", "default.png"));

            return Ok(dataToSend);
        }

        [HttpPost("rejectFriendRequest")]
        public ActionResult<FriendRequest> RejectFriendRequest(IdReceived received)
        {
            var friendRequest = _friendRequestRepository.GetFriendRequest(received.Id);

            if (friendRequest == null)
                return BadRequest(new { result = "not_friends" });

            _friendRequestRepository.DeleteFriendRequest(friendRequest.Id);
            return Ok(new { result = "friend_request_rejected" });
        }

        [HttpPost("request")]
        public ActionResult<FriendRequest> FriendRequest(Guid Id)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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

        [HttpPost("sendFriendRequest")]
        public ActionResult<FriendRequest> SendFriendRequest(IdReceived received)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var friendRequest = new FriendRequest 
            {
                UserId = user.Id,
                User_FriendId = received.Id,
                CreatedOn = DateTime.Now,
            };

            _friendRequestRepository.RequestFriend(friendRequest);

            _notificationRepository.CreateNotifFriendRequest(friendRequest);

            return Ok(new { result = "request_sent"});
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
