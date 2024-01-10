using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.Models;

namespace pastebook_db.Controllers
{
    [Route("api/postLike")]
    [ApiController]
    public class PostLikeController : ControllerBase
    {
        private readonly PostLikeRepository _postLikeRepository;
        private readonly NotificationRepository _notificationRepository;
        private readonly UserRepository _userRepository;
        private readonly PostRepository _postRepository;

        public PostLikeController(PostLikeRepository postLikeRepository, NotificationRepository notificationRepository, UserRepository userRepository, PostRepository postRepository)
        {
            _postLikeRepository = postLikeRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
        }

        [HttpGet]
        public ActionResult<Post> GetPostLikeById(Guid id) 
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postLike = _postLikeRepository.GetPostLikeById(id, user.Id);
            return Ok(postLike);
        }

        [HttpGet("allPostLike")]
        public ActionResult<Post> GetAllPostLike()
        {
            var postLikes = _postLikeRepository.GetAllPostLikes();
            return Ok(postLikes);
        }

        // A friend has liked a user's post
        [HttpPost("likePost")]
        public ActionResult<Post> LikedPost(PostLikeDTO like)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postLike = new PostLike
            {
                PostId = like.PostId,
                UserId = user.Id,
                CreatedOn = DateTime.Now,
            };
            _postLikeRepository.CreatePostLike(postLike);

            var post = _postRepository.GetPostById(like.PostId);

            if(post.UserId != user.Id)
                _notificationRepository.CreateNotifPostLike(postLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpDelete("unlikePost")]
        public ActionResult<Post> UnlikedPost()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var pId = Request.Query["postId"];
            var postId = Guid.Parse(pId.ToString());
            var postLike = _postLikeRepository.GetPostLikeById(postId, user.Id);

            if (postLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _postLikeRepository.RemovePostLike(postLike);

            return Ok(new { result = "post_unliked" });
        }
    }
}
