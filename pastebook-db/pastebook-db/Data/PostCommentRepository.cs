using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class PostCommentRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;

        public PostCommentRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
        }

        public PostComment GetPostCommmentById(Guid postCommentId)
        {
            return _context.PostComments.FirstOrDefault(pC => pC.Id == postCommentId);
        }

        public List<PostComment> GetAllPostComments(Guid id) 
        {
            return _context.PostComments.Where(p => p.PostId == id).ToList();
        }

        public void CreatePostComment(PostComment postComment)
        {
            _context.PostComments.Add(postComment);
            _context.SaveChanges();
        }

        public void UpdatePostComment(PostComment postComment)
        {
            _context.Entry(postComment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemovePostComment(PostComment postComment)
        {
            _context.PostComments.Remove(postComment);
            _context.SaveChanges();
        }

        // ---
        public PostCommentDTO ConvertPostCommentToDTO(PostComment postComment) 
        {
            var newPostComment = new PostCommentDTO
            {
                Id = postComment.Id,
                Comment = postComment.Comment,
                CreatedOn = HelperFunction.TimeDifference(postComment.CreatedOn, DateTime.Now),
                PostId = postComment.Id,
                UserId = postComment.UserId,
            };

            newPostComment.User = _friendRepository.ConvertUserToUserSendDTO(postComment.User);

            return newPostComment;
        }
    }
}
