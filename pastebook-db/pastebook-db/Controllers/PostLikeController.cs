using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

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
        private readonly TokenController _tokenController;

        public PostLikeController(PostLikeRepository postLikeRepository, NotificationRepository notificationRepository, UserRepository userRepository, PostRepository postRepository, TokenController tokenController)
        {
            _postLikeRepository = postLikeRepository;
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _postRepository = postRepository;
            _tokenController = tokenController;
        }

        [HttpGet]
        public ActionResult<Post> GetPostLikeById(Guid id) 
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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

        [HttpPost("getAllLikesIdInPost")]
        public ActionResult<Post> GetAllLikesIdInPost(IdReceived received)
        {
            var post = _postRepository.GetPostById(received.Id);

            if (post == null)
                return BadRequest(new { result = "no_post"});

            var postLikes = _postLikeRepository.GetAllLikesByPostId(post.Id);

            var likes = new List<Guid>();
            foreach (var postLiked in postLikes)
                likes.Add(postLiked.Id);

            return Ok(likes);
        }

        [HttpPost("getUserByPostLikeId")]
        public ActionResult<Post> GetUserByPostLikeId(IdReceived received)
        {
            var post = _postLikeRepository.GetPostLikeById(received.Id);

            if (post == null)
                return BadRequest(new { result = "no_postlike" });

            var user = new UserHomeDTO 
            {
                UserId = post.User.Id,
                Fullname = $"{post.User.FirstName} {post.User.LastName}"
            };

            if(post.User.ProfilePicture != null)
                user.ProfilePicture = HelperFunction.PictureExists(post.User.ProfilePicture, Path.Combine("wwwroot", "images", "default.png"));

            return Ok(user);
        }

        // A friend has liked a user's post
        [HttpPost("likePost")]
        public ActionResult<Post> LikedPost(PostLikeDTO like)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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

        [HttpPost("userLikedPost")]
        public ActionResult<Post> UserLikedPost(IdReceived postId)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postLike = new PostLike
            {
                PostId = postId.Id,
                UserId = user.Id,
                CreatedOn = DateTime.Now,
            };

            _postLikeRepository.CreatePostLike(postLike);

            var post = _postRepository.GetPostById(postId.Id);

            if (post != null && post.UserId != user.Id)
                _notificationRepository.CreateNotifPostLike(postLike);

            return Ok(new { result = "post_liked" });
        }

        // A friend has unliked a user's post
        [HttpPost("userDislikedPost")]
        public ActionResult<Post> UserDislikedPost(IdReceived postId)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var postLike = _postLikeRepository.GetPostLikeById(postId.Id, user.Id);

            if (postLike == null)
                return NotFound(new { result = "post_like_not_found" });

            _postLikeRepository.RemovePostLike(postLike);

            return Ok(new { result = "post_unliked" });
        }

        // A friend has unliked a user's post
        [HttpDelete("unlikePost")]
        public ActionResult<Post> UnlikedPost()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

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
