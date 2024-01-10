using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class AlbumImageCommentRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;

        public AlbumImageCommentRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
        }

        public AlbumImageComment? GetAlbumImageCommmentById(Guid albumImageCommentId)
        {
            return _context.AlbumImageComments.FirstOrDefault(pC => pC.Id == albumImageCommentId);
        }

        public List<AlbumImageComment> GetAllAlbumImageComments()
        {
            return _context.AlbumImageComments.ToList();
        }

        public void CreateAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.AlbumImageComments.Add(albumImageComment);
            _context.SaveChanges();
        }

        public void UpdateAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.Entry(albumImageComment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void RemoveAlbumImageComment(AlbumImageComment albumImageComment)
        {
            _context.AlbumImageComments.Remove(albumImageComment);
            _context.SaveChanges();
        }

        public AlbumImageCommentDTO ConvertAlbumImageCommentToDTO(AlbumImageComment albumImageComment) 
        {
            AlbumImageCommentDTO newAlbumImageComment = new()
            {
                Id = albumImageComment.Id,
                Comment = albumImageComment.Comment,
                CreatedOn = HelperFunction.TimeDifference(albumImageComment.CreatedOn, DateTime.Now),
                AlbumImageId = albumImageComment.AlbumImageId,
                UserId = albumImageComment.UserId,
                User = _friendRepository.ConvertUserToUserSendDTO(albumImageComment.User),
            };

            return newAlbumImageComment;
        }
    }
}
