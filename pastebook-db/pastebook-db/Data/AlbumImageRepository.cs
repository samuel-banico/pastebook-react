using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class AlbumImageRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;
        private readonly AlbumImageLikeRepository _albumImageLikeRepository;
        private readonly AlbumImageCommentRepository _albumImageCommentRepository;

        public AlbumImageRepository(PastebookContext context, FriendRepository friendRepository, AlbumImageLikeRepository albumImageLikeRepository, AlbumImageCommentRepository albumImageCommentRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
            _albumImageLikeRepository = albumImageLikeRepository;
            _albumImageCommentRepository = albumImageCommentRepository;
        }

        // --- GET
        public AlbumImage? GetAlbumImageById(Guid id)
        {
            var post = _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .ThenInclude(u => u.User)
                        .Include(a => a.AlbumImageCommentsList)
                        .ThenInclude(u => u.User)
                        .FirstOrDefault(a => a.Id == id);
            return post;
        }

        public string? GetFirstPhotoOfAlbum(Guid albumId) 
        {
            var photo = _context.AlbumImages
                        .FirstOrDefault(a => a.AlbumId == albumId);

            if(photo == null)
                return null;

            return photo.Image;
        }

        public List<AlbumImage> GetAllAlbumImagesByAlbumId(Guid albumId)
        {
            return _context.AlbumImages
                        .Include(a => a.AlbumImageLikesList)
                        .Include(a => a.AlbumImageCommentsList)
                        .Where(p => p.AlbumId == albumId)
                        .ToList();
        }

        // --- POST
        public void CreateAlbumImage(AlbumImage albumImage)
        {
            _context.AlbumImages.Add(albumImage);
            _context.SaveChanges();
        }

        // PUT
        public void UpdateAlbumImage(AlbumImage albumImage)
        {
            _context.Entry(albumImage).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // --- DELETE
        public void DeleteAlbumImage(AlbumImage albumImage)
        {
            _context.AlbumImages.Remove(albumImage);
            _context.SaveChanges();
        }

        public AlbumImageDTO ConvertAlbumImageToDTO(AlbumImage aI, Guid loggedUserId) 
        {
            AlbumImageDTO newAlbum = new() 
            {
                Id = aI.Id,
                IsEdited = aI.IsEdited,
                AlbumId = aI.AlbumId,
                CreatedOn = HelperFunction.TimeDifference(aI.CreatedOn, DateTime.Now),
            };
            
            if (File.Exists(aI.Image))
                newAlbum.Image = HelperFunction.SendImageToAngular(aI.Image);
            else
                newAlbum.Image = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default_albumImage.png"));

            List<AlbumImageCommentDTO> albumImageComments = new();
            if (aI.AlbumImageCommentsList != null && aI.AlbumImageCommentsList.Count > 0)
            {
                aI.AlbumImageCommentsList = aI.AlbumImageCommentsList.OrderByDescending(x => x.CreatedOn).ToList();

                foreach (var comments in aI.AlbumImageCommentsList)
                    albumImageComments.Add(_albumImageCommentRepository.ConvertAlbumImageCommentToDTO(comments));
            }
            newAlbum.CommentCount = albumImageComments.Count;
            newAlbum.AlbumImageCommentsList = albumImageComments;

            List<AlbumImageLikeDTO> albumImageLikes = new();
            if (aI.AlbumImageLikesList != null && aI.AlbumImageLikesList.Count > 0)
            {   
                foreach (var like in aI.AlbumImageLikesList)
                    albumImageLikes.Add(_albumImageLikeRepository.ConvertAlbumImageLikeToDTO(like));
            }
            newAlbum.AlbumImageLikesList = albumImageLikes;
            newAlbum.LikeCount = albumImageLikes.Count;

            if ((newAlbum.AlbumImageLikesList != null || newAlbum.AlbumImageLikesList.Count > 0) && newAlbum.AlbumImageLikesList.Any(x => x.UserId == loggedUserId))
                newAlbum.HasLiked = true;
            else
                newAlbum.HasLiked = false;

            return newAlbum;
        }
    }
}
