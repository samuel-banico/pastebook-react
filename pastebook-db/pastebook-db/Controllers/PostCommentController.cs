using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

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
        private readonly TokenController _tokenController;

        public PostCommentController(PostCommentRepository postCommentRepository, NotificationRepository notificationRepository, UserRepository userRepository, PostRepository postRepository, TokenController tokenController)
        {
            _postCommentRepository = postCommentRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
            _tokenController = tokenController;
        }

        [HttpGet]
        public ActionResult<Post> GetPostCommentById(Guid id) 
        {
            var postComment = _postCommentRepository.GetPostCommentById(id);

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

        [HttpPost("getAllCommentsIdInPost")]
        public ActionResult<Post> GetAllCommentsIdInPost(IdReceived received)
        {
            var post = _postRepository.GetPostById(received.Id);

            if (post == null)
                return BadRequest(new { result = "no_post" });

            var postComment = _postCommentRepository.GetAllCommentsByPostId(post.Id);

            var comments = new List<Guid>();
            foreach (var comment in postComment)
                comments.Add(comment.Id);

            return Ok(comments);
        }

        [HttpPost("getUserByPostCommentId")]
        public ActionResult<Post> GetUserByPostCommentId(IdReceived received)
        {
            var post = _postCommentRepository.GetPostCommentById(received.Id);

            if (post == null)
                return BadRequest(new { result = "no_postComment" });

            var user = new UserHomeDTO
            {
                UserId = post.User.Id,
                Fullname = $"{post.User.FirstName} {post.User.LastName}"
            };

            if (post.User.ProfilePicture != null)
                user.ProfilePicture = HelperFunction.PictureExists(post.User.ProfilePicture, Path.Combine("wwwroot", "images", "default.png"));

            var dataToSend = new SinglePostCommentDTO
            {
                Comment = post.Comment,
                CreatedOn = HelperFunction.TimeDifference(post.CreatedOn, DateTime.Now),
                User = user,
            };

            return Ok(dataToSend);
        }

        [HttpPost("userCommentedOnPost")]
        public ActionResult<Post> UserCommentedOnPost(CommentedOnPost post)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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

            if (postCom != null && postCom.UserId != user.Id)
                _notificationRepository.CreateNotifPostComment(postComment);

            return Ok(new { result = "post_comment" });
        }

        [HttpPost("commentPost")]
        public ActionResult<Post> CommentPost(PostCommentDTO post)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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
            var postComment = _postCommentRepository.GetPostCommentById(postCommentId);

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
            var postComment = _postCommentRepository.GetPostCommentById(postCommentId);

            if (postComment == null)
                return NotFound(new { result = "post_comment_not_found" });

            _postCommentRepository.RemovePostComment(postComment);

            return Ok(new { result = "post_unliked" });
        }
    }
}
