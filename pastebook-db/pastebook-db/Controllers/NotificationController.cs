using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/notif")]
    public class NotificationController : Controller
    {
        private readonly NotificationRepository _repo;
        private readonly UserRepository _userRepository;

        public NotificationController(NotificationRepository repo, UserRepository userRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
        }

        [HttpGet("unseenNotification")]
        public ActionResult<Notification> GetUnseenNotification()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

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

        [HttpGet("allNotification")]
        public ActionResult<Notification> GetAllNotifications()
        {
            //Added for Notif Connection
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

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

        [HttpPut]
        public ActionResult<Notification> SeenNotification()
        {
            var notifId = Guid.Parse(Request.Query["notifId"]);
            _repo.SeenNotification(notifId);

            return Ok(new { result = "notification_seen"});
        }

        [HttpPut("clearNotification")]
        public ActionResult<Notification> ClearNotification()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            _repo.ClearNotification(user.Id);

            return Ok(new { result = "notification_seen" });
        }

    }
}
