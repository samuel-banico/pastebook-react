using Org.BouncyCastle.Asn1.Mozilla;
using pastebook_db.Controllers;
using pastebook_db.Database;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class HomeRepository
    {
        private readonly PastebookContext _context;
        private readonly PostRepository _postRepository;

        public HomeRepository(PastebookContext context, PostRepository postRepository)
        {
            _context = context;
            _postRepository = postRepository;
        }

        public List<User> getAllUser()
        {
            return _context.Users.ToList();
        }

        public List<User> GetSearchedUser(string toSearch, Guid loggedUserId)
        {
            var users = getAllUser()
                    .Where( u =>
                    ($"{u.FirstName} {u.LastName}").Contains(toSearch, StringComparison.OrdinalIgnoreCase) && u.Id != loggedUserId)
                    .ToList();

            return users;
        }

        public int GetFriendRequestCount(Guid userId) 
        {
            var friendReq = _context.FriendRequests
                    .Where(x => x.User_FriendId == userId)
                    .Count();

            return friendReq;
        }

        public int GetUnseenNotificationCount(Guid userId)
        {
            var notifCount = _context.Notifications
                    .Where(x => x.UserId == userId && x.HasSeen == false)
                    .Count();

            return notifCount;
        }

        public UserHomeDTO GetUserHomeDTO(User user) 
        {
            var userHome = new UserHomeDTO
            {
                UserId = user.Id,
                Fullname = $"{user.FirstName} {user.LastName}"
            };

            if (File.Exists(user.ProfilePicture))
            {
                userHome.ProfilePicture = HelperFunction.SendImageToAngular(user.ProfilePicture);
            }
            else
            {
                userHome.ProfilePicture = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default.png"));
            }

            return userHome;
        }

        //Simple Post DTO
        public SimplePostDTO PostToSimpleDTO(Post post, Guid loggedUserId)
        {
            var convertedPost = new SimplePostDTO()
            {
                Id = post.Id,
                Content = post.Content,
                IsPublic = post.IsPublic,
                IsEdited = post.IsEdited,
                CreatedOn = HelperFunction.TimeDifference(post.CreatedOn, DateTime.Now),

                UserId = post.UserId,
                FriendId = post.FriendId,
            };

            var UserPostDTO = GetUserHomeDTO(post.User);
            convertedPost.User = UserPostDTO;

            if (post.Friend != null)
            {
                User u = new User();
                if (post.Friend.User == post.User)
                    u = post.Friend.User_Friend;
                else
                    u = post.Friend.User;

                convertedPost.Friend = GetUserHomeDTO(u);
            }

            convertedPost.CommentCount = post.PostCommentList == null ? 0 : post.PostCommentList.Count;

            convertedPost.LikeCount = post.PostLikeList == null ? 0 : post.PostLikeList.Count;

            convertedPost.HasLiked = (post.PostLikeList != null && post.PostLikeList.Any(x => x.UserId == loggedUserId));

            return convertedPost;
        }

        public List<SimplePostDTO> GetFeed(User user)
        {
            List<Post> friendsPosts = new();
            if (user.ViewPublicPost)
                friendsPosts = _postRepository.GetAllPublicPosts();
            else
                friendsPosts = _postRepository.GetAllPublicPostOfFriends(user.Id);

            friendsPosts.AddRange(_postRepository.GetAllPrivatePostOfFriends(user.Id));
            friendsPosts.AddRange(_postRepository.GetAllPublicPostOfFriends(user.Id));
            friendsPosts.AddRange(_postRepository.GetAllPostOfUserTimeline(user.Id));

            friendsPosts = friendsPosts.OrderByDescending(x => x.CreatedOn).ToList();

            if (friendsPosts == null)
                return new List<SimplePostDTO>();

            var feed = new List<SimplePostDTO>();
            foreach (var post in friendsPosts)
            {
                var postDto = PostToSimpleDTO(post, user.Id);

                feed.Add(postDto);
            }

            feed = feed.Distinct(new SimplePostComparer()).ToList();

            return feed;
        }
    }

}
