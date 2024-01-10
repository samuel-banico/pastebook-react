using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class AlbumRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;
        private readonly AlbumImageRepository _albumImageRepository;

        public AlbumRepository(PastebookContext context, FriendRepository friendRepository, AlbumImageRepository albumImageRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
            _albumImageRepository = albumImageRepository;
        }

        public Album? GetAlbumById(Guid? id)
        {
            try
            {
                return _context.Albums
                .Include(a => a.AlbumImageList)
                .Include(a => a.AlbumImageList)
                .ThenInclude(aL => aL.AlbumImageLikesList)
                .ThenInclude(u => u.User)
                .Include(a => a.AlbumImageList)
                .ThenInclude(aC => aC.AlbumImageCommentsList)
                .ThenInclude(u => u.User)
                .FirstOrDefault(p => p.Id == id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public List<Album>? GetAllAlbumByOwner(Guid userId)
        {
            try
            {
                return _context.Albums
                .Include(a => a.AlbumImageList)
                .Where(p => p.UserId == userId)
                .ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public List<Album> GetAllAlbumByOther(Guid retrievedUserId, Guid loggedUserId)
        {
            var isFriend = _friendRepository.GetFriendship(retrievedUserId, loggedUserId);

            if (isFriend != null)
                return GetAllAlbumByOwner(retrievedUserId);

            return _context.Albums
                .Include(a => a.AlbumImageList)
                .Where(p => p.UserId == retrievedUserId && p.IsPublic == true)
                .ToList();
        }

        public void CreateAlbum(Album album)
        {
            _context.Albums.Add(album);
            _context.SaveChanges();
        }

        public void UpdateAlbum(Album album)
        {
            _context.Entry(album).State = EntityState.Modified;
            _context.SaveChanges();
        }

        // To be edit
        public void DeleteAlbum(Album album)
        {
            if (album.AlbumImageList != null)
            {
                foreach (var a in album.AlbumImageList)
                {
                    if (a.AlbumImageCommentsList != null) 
                    {
                        _context.AlbumImageComments.RemoveRange(a.AlbumImageCommentsList);
                        _context.SaveChanges();
                    }

                    if (a.AlbumImageLikesList != null) 
                    {
                        _context.AlbumImageLikes.RemoveRange(a.AlbumImageLikesList);
                        _context.SaveChanges();
                    }
                }

                _context.AlbumImages.RemoveRange(album.AlbumImageList);
            }

            var albumNotifs = _context.Notifications.Where(n => n.AlbumId == album.Id).ToList();
            if (albumNotifs.Count != 0)
            {
                _context.Notifications.RemoveRange(albumNotifs);
                _context.SaveChanges();
            }

            _context.Albums.Remove(album);
            _context.SaveChanges();
        }

        // Album DTO
        public AlbumDTO ConvertAlbumToAlbumDTO(Album album, Guid loggedUserId)
        {
            var albumDTO = new AlbumDTO()
            {
                Id = album.Id,
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription,
                IsPublic = album.IsPublic,
                IsEdited = album.IsEdited,
                CreatedOn = album.CreatedOn.ToString("MM-dd-yyyy"),

                UserId = album.UserId,
            };

            if (album.AlbumImageList != null && album.AlbumImageList.Count > 0)
            {
                var otherImage = album.AlbumImageList.First().Image;
                if (File.Exists(otherImage))
                    albumDTO.CoverAlbumImage = HelperFunction.SendImageToAngular(otherImage);
                else
                    albumDTO.CoverAlbumImage = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default_album.png"));


                var imageList = new List<AlbumImageDTO>();
                foreach (var image in album.AlbumImageList) 
                {
                    imageList.Add(_albumImageRepository.ConvertAlbumImageToDTO(image, loggedUserId));
                }

                albumDTO.ImageList = imageList;  
                albumDTO.ImageCount = album.AlbumImageList.Count;
            }
            else
            {
                albumDTO.CoverAlbumImage = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default_album.png"));
                albumDTO.ImageList = new List<AlbumImageDTO>();
                albumDTO.ImageCount = 0;
            }

            return albumDTO;
        }
    }
}
