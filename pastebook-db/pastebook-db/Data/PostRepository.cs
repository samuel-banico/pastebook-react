using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using NuGet.Packaging;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class PostRepository
    {
        private readonly PastebookContext _context;

        private readonly UserRepository _userRepository;
        private readonly FriendRepository _friendRepository;
        private readonly PostLikeRepository _postLikeRepository;
        private readonly PostCommentRepository _postCommentRepository;

        public PostRepository(PastebookContext context, FriendRepository friendRepository, UserRepository userRepository, PostCommentRepository postCommentRepository, PostLikeRepository postLikeRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
            _userRepository = userRepository;
            _postCommentRepository = postCommentRepository;
            _postLikeRepository = postLikeRepository;
        }

        public Post? GetPostById(Guid id)
        {
            var post = _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .FirstOrDefault(p => p.Id == id);

            return post;
        }

        public List<Post> GetAllPostOfUserTimeline(Guid userId)
        {
            return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedOn)
                .ToList();
        }

        public List<Post> GetAllPrivatePostOfUser(Guid userId)
        {
            return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == userId && p.IsPublic == false)
                .ToList();
        }

        public List<Post> GetAllPublicPostOfUser(Guid userId)
        {
            return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == userId && p.IsPublic == true)
                .ToList();
        }

        public List<Post> GetAllPostOfOtherTimeline(Guid retrievedUserId, Guid loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllPostOfUserTimeline(retrievedUserId);

            return _context.Posts
                // Comments
                .Include(p => p.PostCommentList)
                // Users who commented
                .ThenInclude(u => u.User)
                // Likes
                .Include(p => p.PostLikeList)
                // Users who likes
                .ThenInclude(u => u.User)
                // The posters credentials
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.UserId == retrievedUserId && p.IsPublic == true)
                .OrderByDescending(p => p.CreatedOn)
                .ToList();
        }

        public List<Post>? GetAllPrivatePostOfFriends(Guid userId) 
        {
            var friendList = _friendRepository.GetAllUserFriends(userId);

            if (friendList == null)
                return null;

            List<Post> posts = new();

            foreach (var friend in friendList)
            {
                posts.AddRange(GetAllPrivatePostOfUser(friend.Id));
            }

            return posts;
        }

        //Get all post friend Id
        public List<Post>? GetAllPublicPostOfFriends(Guid userId)
        {
            var friendList = _friendRepository.GetAllUserFriends(userId);

            if (friendList == null)
                return null;

            List<Post> posts = new();

            foreach (var friend in friendList)
            {
                posts.AddRange(GetAllPublicPostOfUser(friend.Id));
            }

            return posts;
        }

        public List<Post>? GetAllPublicPosts() 
        {
            try
            {
                return _context.Posts
                .Include(p => p.PostCommentList)
                .ThenInclude(u => u.User)
                .Include(p => p.PostLikeList)
                .ThenInclude(u => u.User)
                .Include(u => u.User)
                // Friends Credentials
                .Include(f => f.Friend)
                .ThenInclude(u => u.User)
                .Include(f => f.Friend)
                .ThenInclude(f => f.User_Friend)
                .Where(p => p.IsPublic == true)
                .ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            
        } 

        // --- POST
        public void CreatePost(Post post)
        {
            _context.Posts.Add(post);
            _context.SaveChanges();
        }
        
        // --- PUT
        public void UpdatePost(Post post) 
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // --- DELETE
        public void DeletePost(Post post) 
        {            
            _context.Posts.Remove(post);
            _context.SaveChanges();
        }

        // POST DTO
        public PostDTO ConvertPostToPostDTO(Post post, Guid loggedUserId)
        {
            var postDto = new PostDTO()
            {
                Id = post.Id,
                Content = post.Content,
                IsPublic = post.IsPublic,
                IsEdited = post.IsEdited,
                CreatedOn = HelperFunction.TimeDifference(post.CreatedOn, DateTime.Now),

                UserId = post.UserId,
                FriendId = post.FriendId,
            };

            var UserPostDTO = _friendRepository.ConvertUserToUserSendDTO(post.User);
            postDto.User = UserPostDTO;

            if (post.Friend != null) 
            {
                User u = new User();
                if (post.Friend.User == post.User)
                    u = post.Friend.User_Friend;
                else
                    u = post.Friend.User;

                postDto.Friend = _friendRepository.ConvertUserToUserSendDTO(u);
            }

            List<PostCommentDTO> postComments = new();
            if (post.PostCommentList != null || post.PostCommentList.Count > 0)
            {
                post.PostCommentList = post.PostCommentList.OrderByDescending(x => x.CreatedOn).ToList();
                foreach (var postComment in post.PostCommentList)
                    postComments.Add(_postCommentRepository.ConvertPostCommentToDTO(postComment));
            }

            postDto.PostCommentList = postComments;
            postDto.CommentCount = postComments.Count;

            List<PostLikeDTO> postLikes = new();
            if (post.PostLikeList != null || post.PostLikeList.Count > 0)
            {
                foreach (var postLike in post.PostLikeList)
                    postLikes.Add(_postLikeRepository.ConvertPostLikeToDTO(postLike));
            }
            postDto.PostLikeList = postLikes;
            postDto.LikeCount = postLikes.Count;

            if ((postDto.PostLikeList != null || postDto.PostLikeList.Count > 0) && post.PostLikeList.Any(x => x.UserId == loggedUserId))
                postDto.HasLiked = true;
            else
                postDto.HasLiked = false;

            return postDto;
        }
    }
}
