using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/postComment")]
    [ApiController]
    public class PostCommentController : ControllerBase
    {
        private readonly PostCommentRepository _postCommentRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;
        private readonly PostRepository _postRepository;

        public PostCommentController(PostCommentRepository postCommentRepository, NotificationRepository notificationRepository, UserRepository userRepository, PostRepository postRepository)
        {
            _postCommentRepository = postCommentRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetPostCommentById(Guid id) 
        {
            var postComment = _postCommentRepository.GetPostCommmentById(id);

            if(postComment == null)
                return NotFound(new { result = "no_post_comment" });

            return Ok(postComment);
        }

        [HttpGet("allPostComments")]
        public ActionResult<Post> GetAllPostComments(Guid id)
        {
            var postComment = _postCommentRepository.GetAllPostComments(id);

            if (postComment == null)
                return NotFound(new { result = "no_post_comment" });

            return Ok(postComment);
        }

        [HttpPost("commentPost")]
        public ActionResult<Post> CommentPost(PostCommentDTO post)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postComment = new PostComment
            {
                PostId = post.PostId,
                UserId = user.Id,
                Comment = post.Comment,
                CreatedOn = DateTime.Now,
                IsEdited = false
            };

            _postCommentRepository.CreatePostComment(postComment);

            var postCom = _postRepository.GetPostById(post.PostId);

            if (postCom.UserId != user.Id)
                _notificationRepository.CreateNotifPostComment(postComment);

            return Ok(new { result = "post_comment" });
        }

        [HttpPut("edittedCommentPost")]
        public ActionResult<Post> EditCommentPost(Guid postCommentId, string comment)
        {
            var postComment = _postCommentRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });

            postComment.Comment = comment;
            postComment.IsEdited = true;
            postComment.CreatedOn = DateTime.Now;

            _postCommentRepository.UpdatePostComment(postComment);

            return Ok(new { result = "post_comment_editted" });
        }

        //unfinished
        [HttpPut("uncommentPost")]
        public ActionResult<Post> UncommentPost(Guid postCommentId)
        {
            var postComment = _postCommentRepository.GetPostCommmentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });

            _postCommentRepository.RemovePostComment(postComment);

            return Ok(new { result = "post_unliked" });
        }
    }
}
