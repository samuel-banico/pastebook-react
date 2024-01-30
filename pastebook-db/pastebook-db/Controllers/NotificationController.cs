using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/notif")]
    public class NotificationController : Controller
    {
        private readonly NotificationRepository _repo;
        private readonly UserRepository _userRepository;
        private readonly TokenController _tokenController;

        public NotificationController(NotificationRepository repo, UserRepository userRepository, TokenController tokenController)
        {
            _repo = repo;
            _userRepository = userRepository;
            _tokenController = tokenController;
        }

        [HttpGet("unseenNotification")]
        public ActionResult<Notification> GetUnseenNotification()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var notifs = _repo.GetUnseenNotifications(user.Id);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            List<NotifDTO> newNotifs = new();
            foreach (var notif in notifs)
            {
                newNotifs.Add(_repo.NotifToNotifDTO(notif));
            }

            return Ok(newNotifs);
        }

        [HttpGet("getAllUnseenNotificationIds")]
        public ActionResult<Notification> GetAllUnseenNotificationIds()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var notifs = _repo.GetUnseenNotifications(user.Id);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            List<Guid> newNotifs = new();
            foreach (var notif in notifs) 
            {
                if(!notif.HasSeen)
                    newNotifs.Add(notif.Id);
            }

            return Ok(newNotifs);
        }

        [HttpGet("allNotification")]
        public ActionResult<Notification> GetAllNotifications()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var notifs = _repo.GetAllNotifications(user.Id);

            if (notifs == null)
                return NotFound(new { result = "no_notification" });

            List<NotifDTO> newNotifs = new();
            foreach (var notif in notifs)
            {
                newNotifs.Add(_repo.NotifToNotifDTO(notif));
            }

            return Ok(newNotifs);
        }

        [HttpPost("getNotificationById")]
        public ActionResult<Notification> GetNotificationById(IdReceived received)
        {
            var notif = _repo.GetNotificationById(received.Id);

            if (notif == null)
                return BadRequest(new { result = "no_notif" });

            var dataToSend = new NotificationToSend
            {
                Id = notif.Id,
                Content = notif.Content,
                DateCreated = HelperFunction.TimeDifference(notif.NotificationDate, DateTime.Now),
            };

            if (notif.UserRequest == null)
                return BadRequest(new { result = "missing_notification_info" });

            dataToSend.UserSent = new UserHomeDTO
            {
                UserId = notif.UserRequest.Id,
                Fullname = $"{notif.UserRequest.FirstName} {notif.UserRequest.LastName}"
            };

            if (notif.UserRequest.ProfilePicture != null)
                dataToSend.UserSent.ProfilePicture = HelperFunction.PictureExists(notif.UserRequest.ProfilePicture, Path.Combine("wwwroot", "images", "default.png"));


            if (notif.Album != null)
            {
                dataToSend.NavigateTo = "album";
                dataToSend.NavigationId = notif.Album.Id;
            }
            else if (notif.Post != null)
            {
                dataToSend.NavigateTo = "post";
                dataToSend.NavigationId = notif.Post.Id;
            }
            else if (notif.UserRequest != null)
            {
                dataToSend.NavigateTo = "user";
                dataToSend.NavigationId = notif.UserRequest.Id;
            }
            else
                return BadRequest(new { result = "missing_notification_info" });

            return Ok(dataToSend);
        }

        [HttpPut]
        public ActionResult<Notification> SeenNotification()
        {
            var notifId = Guid.Parse(Request.Query["notifId"]);
            var notif = _repo.GetNotificationById(notifId);

            if (notif == null)
                return BadRequest(new { result = "no_notification" });

            _repo.SeenNotification(notif);

            return Ok(new { result = "notification_seen"});
        }

        [HttpPost("notificationHasSeen")]
        public ActionResult<Notification> NotificationHasSeen(IdReceived received)
        {
            var notif = _repo.GetNotificationById(received.Id);

            if(notif == null)
                return BadRequest(new { result = "no_notification"});

            _repo.SeenNotification(notif);

            return Ok(new { result = "notification_seen" });
        }

        [HttpPut("clearNotification")]
        public ActionResult<Notification> ClearNotification()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            _repo.ClearNotification(user.Id);

            return Ok(new { result = "notification_seen" });
        }

    }
}
