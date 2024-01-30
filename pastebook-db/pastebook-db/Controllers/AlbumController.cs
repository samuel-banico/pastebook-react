using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/albums")]
    public class AlbumController : Controller
    {
        private readonly AlbumRepository _albumRepository;
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly UserRepository _userRepository;
        private readonly TokenController _tokenController;

        public AlbumController(AlbumRepository repo, AlbumImageRepository albumImageRepository, UserRepository userRepository, TokenController tokenController)
        {
            _albumRepository = repo;
            _albumImageRepository = albumImageRepository;
            _userRepository = userRepository;
            _tokenController = tokenController;
        }

        // --- GET
        [HttpGet]
        public ActionResult<Album> GetAlbumById(Guid albumId) 
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var album = _albumRepository.GetAlbumById(albumId);

            if(album == null)
                return NotFound(new { result = "no_album"});

            var albumDTO = _albumRepository.ConvertAlbumToAlbumDTO(album, user.Id);

            return Ok(albumDTO);
        }

        /// <summary>
        /// Gets all album details
        /// </summary>
        /// <returns>All </returns>
        [HttpGet("allAlbumByUser")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsByOwner()
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var albums = _albumRepository.GetAllAlbumByOwner(user.Id);
            var userAlbums = new List<AlbumDTO>();

            if(albums == null)
                return Ok(userAlbums);

            foreach (var album in albums)
            {
                userAlbums.Add(_albumRepository.ConvertAlbumToAlbumDTO(album, user.Id));
            }

            return Ok(userAlbums);

        }

        [HttpPost("getAllUserAlbum")]
        public ActionResult<List<Guid>> GetAllUserAlbum (IdReceived received)
        {
            var user = _userRepository.GetUserById(received.Id);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var albums = _albumRepository.GetAllAlbumByOwner(user.Id);
            var userAlbums = new List<Guid>();

            if (albums == null)
                return Ok(userAlbums);

            foreach (var album in albums)
            {
                userAlbums.Add(album.Id);
            }

            return Ok(userAlbums);
        }

        [HttpPost("getAlbumById")]
        public ActionResult<ProfileAlbumDisplayDTO> GetAlbumById(IdReceived received)
        {
            var album = _albumRepository.GetAlbumById(received.Id);

            if (album == null) return BadRequest(new { result = "Album does not exists" });

            var newAlbum = new ProfileAlbumDisplayDTO 
            {
                Id = album.Id,
                albumTitle = album.AlbumName,
            };

            if (album.AlbumImageList != null && album.AlbumImageList.Count() > 0)
            {
                newAlbum.coverImage = HelperFunction.PictureExists(album.AlbumImageList.ToList()[0].Image, Path.Combine("wwwroot", "images", "default_album.png"));
                newAlbum.imageCount = album.AlbumImageList.Count();
            }
            else 
            {
                newAlbum.coverImage = HelperFunction.SendImageToAngular(Path.Combine("wwwroot", "images", "default_album.png"));
                newAlbum.imageCount = 0;
            }
                

            return Ok(newAlbum);
        }

        [HttpPost("getAlbumDetailsById")]
        public ActionResult<Album> GetAlbumDetailsById(IdReceived received)
        {
            var album = _albumRepository.GetAlbumById(received.Id);

            if (album == null)
                return BadRequest(new { result = "album_not_exists" });

            var convertedAlbum = new SingleAlbumDisplay 
            {
                Id=album.Id,
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription,
                DateCreated = album.CreatedOn.ToString("MM-dd-yyyy"),
            };

            var imageList = new List<Guid>();
            if (album.AlbumImageList != null && album.AlbumImageList.Count > 0)
            {
                foreach (var image in album.AlbumImageList)
                    imageList.Add(image.Id);
            }

            convertedAlbum.ImageCount = imageList.Count;
            convertedAlbum.Images = imageList;

            return Ok(convertedAlbum);
        }



        [HttpGet("allAlbumByOther")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsOfOthers(Guid retrievedUserId)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var loggedUserId = _userRepository.GetUserById(userId);

            if (loggedUserId == null)
                return BadRequest(new { result = "no_user" });

            var albums = _albumRepository.GetAllAlbumByOther(retrievedUserId, loggedUserId.Id);

            var otherAlbums = new List<AlbumDTO>();

            if (albums.Count == 0)
                return Ok(otherAlbums);

            foreach (var album in albums)
            {
                var albumDto = _albumRepository.ConvertAlbumToAlbumDTO(album, loggedUserId.Id);

                otherAlbums.Add(albumDto);
            }

            return Ok(otherAlbums);
        }

        // --- POST
        [HttpPost]
        public ActionResult<int> CreateAlbum(AlbumDTO album)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user"});

            var newAlbum = new Album
            {
                IsPublic = true,
                UserId = user.Id,
                CreatedOn = DateTime.Now,
                AlbumName = album.AlbumName,
                AlbumDescription = album.AlbumDescription
            };

            if (string.IsNullOrEmpty(album.AlbumName))
                newAlbum.AlbumName = "Untitled Album";
            
            if (string.IsNullOrEmpty(album.AlbumDescription))
                newAlbum.AlbumDescription = "No Description";

            _albumRepository.CreateAlbum(newAlbum);

            return Ok(newAlbum.Id);
        }

        // --- PUT
        // To be edit
        [HttpPut]
        public ActionResult<Album> UpdateAlbum(AlbumDTO newAlbum)
        {
            var albumToEdit = _albumRepository.GetAlbumById(newAlbum.Id);

            if (albumToEdit == null)
                return BadRequest(new { result = "no_album" });

            albumToEdit.AlbumName = newAlbum.AlbumName;
            albumToEdit.AlbumDescription = newAlbum.AlbumDescription;
            albumToEdit.IsPublic = true;
            albumToEdit.IsEdited = true;
            albumToEdit.CreatedOn = DateTime.Now;
            //albumToEdit.AlbumImageList = newAlbum.AlbumImageList;

            _albumRepository.UpdateAlbum(albumToEdit);

            return Ok(albumToEdit);
        }

        [HttpPut("addCoverPhoto")]
        public ActionResult<Album> AssignCoverToAlbum(Guid albumId, IFormFile image)
        {
            var album = _albumRepository.GetAlbumById(albumId);

            if(album == null)
                return BadRequest(new { result = "no_album"});

            _albumRepository.UpdateAlbum(album);

            return Ok(album);
        }

        // --- DELETE
        [HttpDelete]
        public ActionResult<Album> DeleteAlbum()
        {
            var album = Request.Query["albumId"];
            var albumId = Guid.Parse(album);
            var albumToDelete = _albumRepository.GetAlbumById(albumId);

            if(albumToDelete == null)
                return NotFound(new { result = "album_does_not_exist" });

            // Delete Image from local storage
            if (albumToDelete.AlbumImageList != null ) 
            {
                foreach (var image in albumToDelete.AlbumImageList)
                {
                    HelperFunction.RemoveImageFromLocalStorage(image.Image);
                }
            }

            // Delete from database
            _albumRepository.DeleteAlbum(albumToDelete);

            return Ok(new { result = "album_deleted" });
        }

        [HttpPost("deleteAlbumById")]
        public ActionResult<Album> DeleteAlbumById(IdReceived album)
        {
            var albumToDelete = _albumRepository.GetAlbumById(album.Id);

            if (albumToDelete == null)
                return NotFound(new { result = "album_does_not_exist" });

            // Delete Image from local storage
            if (albumToDelete.AlbumImageList != null)
            {
                foreach (var image in albumToDelete.AlbumImageList)
                {
                    HelperFunction.RemoveImageFromLocalStorage(image.Image);
                }
            }

            // Delete from database
            _albumRepository.DeleteAlbum(albumToDelete);

            return Ok(new { result = "album_deleted" });
        }
    }
}
