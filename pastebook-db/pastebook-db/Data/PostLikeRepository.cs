using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class PostLikeRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;

        public PostLikeRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
        }

        public PostLike? GetPostLikeById(Guid postId,Guid userId)
        {
            return _context.PostLikes.FirstOrDefault(pL => pL.PostId == postId && pL.UserId == userId);
        }

        public PostLike? GetPostLikeByUserId(Guid userId)
        {
            return _context.PostLikes.FirstOrDefault(pL => pL.UserId == userId);
        }


        public List<PostLike> GetAllPostLikes()
        {
            return _context.PostLikes.ToList();
        }

        public void CreatePostLike(PostLike postLike)
        {
            _context.PostLikes.Add(postLike);
            _context.SaveChanges();
        }

        public void RemovePostLike(PostLike postLike)
        {
            _context.PostLikes.Remove(postLike);
            _context.SaveChanges();
        }

        // --- 
        public PostLikeDTO ConvertPostLikeToDTO(PostLike postLike) 
        {
            PostLikeDTO newPost = new();
            newPost.Id = postLike.Id;
            newPost.CreatedOn = HelperFunction.TimeDifference(postLike.CreatedOn, DateTime.Now);
            newPost.PostId = postLike.PostId;
            newPost.UserId = postLike.UserId;
            newPost.User = _friendRepository.ConvertUserToUserSendDTO(postLike.User);

            return newPost;
        }
    }
}
