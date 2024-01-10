using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/albumImageLike")]
    [ApiController]
    public class AlbumImageLikeController : ControllerBase
    {
        private readonly AlbumImageLikeRepository _albumImageLikeRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly AlbumRepository _albumRepository;
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly UserRepository _userRepository;

        public AlbumImageLikeController(AlbumImageLikeRepository albumImageLikeRepository, NotificationRepository notificationRepository, UserRepository userRepository, AlbumRepository albumRepository, AlbumImageRepository albumImageRepository)
        {
            _albumImageLikeRepository = albumImageLikeRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _albumRepository = albumRepository;
            _albumImageRepository = albumImageRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetAlbumLikeById(Guid id)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postLike = _albumImageLikeRepository.GetAlbumImageLikeById(id, user.Id);
            return Ok(postLike);
        }

        [HttpGet("allAlbumImageLike")]
        public ActionResult<Post> GetAllAlbumLikes()
        {
            var postLikes = _albumImageLikeRepository.GetAllAlbumImageLikes();
            return Ok(postLikes);
        }

        // A friend has liked a user's post
        [HttpPost("likeAlbumImage")]
        public ActionResult<Post> LikedAlbumImage(AlbumImageLikeDTO albumImageLike)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var newAlbumImageLike = new AlbumImageLike
            {
                AlbumImageId = albumImageLike.AlbumImageId,
                UserId = user.Id
            };

            _albumImageLikeRepository.CreateAlbumImageLike(newAlbumImageLike);

            var album = _albumRepository.GetAlbumById(_albumImageRepository.GetAlbumImageById(albumImageLike.AlbumImageId).AlbumId);

            if (album.UserId != user.Id)
                _notificationRepository.CreateNotifAlbumImageLike(newAlbumImageLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpDelete("unlikeAlbumImage")]
        public ActionResult<Post> UnlikedAlbumImage()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var pId = Request.Query["albumImageId"];
            var albumImageId = Guid.Parse(pId.ToString());

            var albumImageLike = _albumImageLikeRepository.GetAlbumImageLikeById(albumImageId, user.Id);

            if (albumImageLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _albumImageLikeRepository.RemoveAlbumImageLike(albumImageLike);

            return Ok(new { result = "post_unliked" });
        }
    }
}
