using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Data;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Controllers
{
    [ApiController]
    [Route("api/albums")]
    public class AlbumController : Controller
    {
        private readonly AlbumRepository _albumRepository;
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly UserRepository _userRepository;

        public AlbumController(AlbumRepository repo, AlbumImageRepository albumImageRepository, UserRepository userRepository)
        {
            _albumRepository = repo;
            _albumImageRepository = albumImageRepository;
            _userRepository = userRepository;
        }

        // --- GET
        [HttpGet]
        public ActionResult<Album> GetAlbumById(Guid albumId) 
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var album = _albumRepository.GetAlbumById(albumId);

            if(album == null)
                return NotFound(new { result = "no_album"});

            var albumDTO = _albumRepository.ConvertAlbumToAlbumDTO(album, user.Id);

            return Ok(albumDTO);
        }

        [HttpGet("allAlbumByUser")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsByOwner()
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

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

        [HttpGet("allAlbumByOther")]
        public ActionResult<List<AlbumDTO>> GetAllAlbumsOfOthers(Guid retrievedUserId)
        {
            var token = Request.Headers["Authorization"];
            var loggedUserId = _userRepository.GetUserByToken(token);

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
        public ActionResult<Album> CreateAlbum(AlbumDTO album)
        {
            var token = Request.Headers["Authorization"];
            var user = _userRepository.GetUserByToken(token);

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

            return Ok(newAlbum);
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
    }
}
