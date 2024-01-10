using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class AlbumImageLikeRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;

        public AlbumImageLikeRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
        }

        public AlbumImageLike? GetAlbumImageLikeById(Guid albumImageId, Guid userId)
        {
            return _context.AlbumImageLikes
                .FirstOrDefault(pL => pL.AlbumImageId == albumImageId && pL.UserId == userId);
        }

        public List<AlbumImageLike> GetAllAlbumImageLikes()
        {
            return _context.AlbumImageLikes.ToList();
        }

        public void CreateAlbumImageLike(AlbumImageLike postLike)
        {
            _context.AlbumImageLikes.Add(postLike);
            _context.SaveChanges();
        }

        public void RemoveAlbumImageLike(AlbumImageLike postLike)
        {
            _context.AlbumImageLikes.Remove(postLike);
            _context.SaveChanges();
        }

        public AlbumImageLikeDTO ConvertAlbumImageLikeToDTO(AlbumImageLike albumImageLike) 
        {
            AlbumImageLikeDTO newAlbumImageLike = new()
            {
                Id = albumImageLike.Id,
                AlbumImageId = albumImageLike.AlbumImageId,
                UserId = albumImageLike.UserId,
                User = _friendRepository.ConvertUserToUserSendDTO(albumImageLike.User),
            };

            return newAlbumImageLike;
        }
    }
}
