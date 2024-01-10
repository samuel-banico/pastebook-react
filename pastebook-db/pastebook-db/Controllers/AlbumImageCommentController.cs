using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/albumImageComment")]
    [ApiController]
    public class AlbumImageCommentController : ControllerBase
    {
        private readonly AlbumImageCommentRepository _albumImageCommentRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly AlbumRepository _albumRepository;

        public AlbumImageCommentController(AlbumImageCommentRepository albumImageCommentRepository, NotificationRepository notificationRepository, UserRepository userRepository, AlbumImageRepository albumImageRepository, AlbumRepository albumRepository)
        {
            _albumImageCommentRepository = albumImageCommentRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _albumImageRepository = albumImageRepository;
            _albumRepository = albumRepository;
        }

        [HttpGet]
        public ActionResult<AlbumImageComment> GetAlbumImageCommentById(Guid id)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(id);

            if (albumImageComment == null)
                return NotFound(new { result = "no_albumImage_comment" });

            return Ok(albumImageComment);
        }

        [HttpGet("allAlbumImageComments")]
        public ActionResult<AlbumImageComment> GetAllAlbumImageComments(int id)
        {
            var albumImageComment = _albumImageCommentRepository.GetAllAlbumImageComments();

            if (albumImageComment == null)
                return NotFound(new { result = "no_albumImage_comment" });

            return Ok(albumImageComment);
        }

        [HttpPost("commentAlbumImage")]
        public ActionResult<AlbumImageComment> CommentAlbumImage(AlbumImageCommentDTO albumImageComment)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var newAlbumImageComment = new AlbumImageComment
            {
                AlbumImageId = albumImageComment.AlbumImageId,
                UserId = user.Id,
                Comment = albumImageComment.Comment,
                CreatedOn = DateTime.Now,
                IsEdited = false
            };

            _albumImageCommentRepository.CreateAlbumImageComment(newAlbumImageComment);

            var album = _albumRepository.GetAlbumById(_albumImageRepository.GetAlbumImageById(albumImageComment.AlbumImageId).AlbumId);

            if (album.UserId != user.Id)
                _notificationRepository.CreateNotifAlbumImageComment(newAlbumImageComment);

            return Ok(new { result = "albumImage_liked" });
        }

        [HttpPut("edittedCommentAlbumImage")]
        public ActionResult<AlbumImageComment> EditCommentAlbumImage(Guid albumImageCommentId, string comment)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(albumImageCommentId);

            if (albumImageComment == null)
                return NotFound(new { result = "albumImage_comment_not_found" });

            albumImageComment.Comment = comment;
            albumImageComment.IsEdited = true;
            albumImageComment.CreatedOn = DateTime.Now;

            _albumImageCommentRepository.UpdateAlbumImageComment(albumImageComment);

            return Ok(new { result = "albumImage_comment_edited" });
        }

        //unfinished
        [HttpPut("uncommentAlbumImage")]
        public ActionResult<AlbumImageComment> UncommentAlbumImage(Guid albumImageCommentId)
        {
            var albumImageComment = _albumImageCommentRepository.GetAlbumImageCommmentById(albumImageCommentId);

            if (albumImageComment == null)
                return NotFound(new { result = "albumImage_comment_not_found" });

            _albumImageCommentRepository.RemoveAlbumImageComment(albumImageComment);

            return Ok(new { result = "albumImage_uncomment" });
        }
    }
}
