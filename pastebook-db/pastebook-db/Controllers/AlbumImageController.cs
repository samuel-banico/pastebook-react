using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using pastebook_db.Data;
using pastebook_db.DTO;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using pastebook_db.Services.Token.TokenData;

namespace pastebook_db.Controllers
{
    [Route("api/albumImage")]
    [ApiController]
    public class AlbumImageController : ControllerBase
    {
        private readonly AlbumImageRepository _albumImageRepository;
        private readonly UserRepository _userRepository;
        private readonly TokenController _tokenController;

        public AlbumImageController(AlbumImageRepository albumImageRepository, UserRepository userRepository, TokenController tokenController)
        {
            _albumImageRepository = albumImageRepository;
            _userRepository = userRepository;
            _tokenController = tokenController;
        }

        [HttpGet]
        public ActionResult<AlbumImage> GetAlbumImageById(Guid id)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var album = _albumImageRepository.GetAlbumImageById(id);

            if(album == null)
                return NotFound(new { result = "album_does_not_exist"});

            var newAlbum = _albumImageRepository.ConvertAlbumImageToDTO(album, user.Id);

            return Ok(newAlbum);
        }

        [HttpGet("getAllAlbumImage")]
        public ActionResult<AlbumImage> GetAllAlbumImageByAlbumId(Guid albumId) 
        {
            var albumImageList = _albumImageRepository.GetAllAlbumImagesByAlbumId(albumId);

            if(albumImageList == null || albumImageList.Count == 0)
                return NotFound(albumImageList);

            return Ok(albumImageList);
        }

        [HttpPost]
        public ActionResult<AlbumImage> CreateAlbumImage(Guid albumId, IFormFile image) 
        {
            var newAlbumImage = new AlbumImage
            {
                Image = HelperFunction.SaveImageToLocalStorage(image),
                CreatedOn = DateTime.Now,
                IsEdited = false,
                AlbumId = albumId
            };

            _albumImageRepository.CreateAlbumImage(newAlbumImage);

            return Ok();
        }

        
        [HttpPost("getAlbumImagePhotoById")]
        public ActionResult<AlbumImage> GetAlbumImagePhotoById(IdReceived received)
        {
            var image = _albumImageRepository.GetAlbumImageById(received.Id);

            if(image == null)
                return BadRequest(new { result = "no_image"});

            var imageToReturn = new SingleAlbumImageToDisplay 
            {
                Id = received.Id,
                Image = HelperFunction.PictureExists(image.Image, Path.Combine("wwwroot", "images", "default_albumImage.png"))
            };

            return Ok(imageToReturn);
        }

        [HttpPost("getAlbumImageDetailsById")]
        public ActionResult<AlbumImage> getAlbumImageDetailsById(IdReceived received)
        {
            var token = Request.Headers["Authorization"];
            var userId = _tokenController.DecodeJwtToken(token);
            var user = _userRepository.GetUserById(userId);

            if (user == null)
                return BadRequest(new { result = "no_user" });

            var image = _albumImageRepository.GetAlbumImageById(received.Id);

            if (image == null)
                return BadRequest(new { result = "no_image" });

            var imageToReturn = new AlbumImageDetails
            {
                Id = received.Id,
                Image = HelperFunction.PictureExists(image.Image, Path.Combine("wwwroot", "images", "default_albumImage.png")),
                CreatedOn = image.CreatedOn.ToString("MM-dd-yyyy"),
            };

            if (image.AlbumImageLikesList != null && image.AlbumImageLikesList.Count > 0)
            {
                imageToReturn.LikeCount = image.AlbumImageLikesList.Count;

                imageToReturn.HasLiked = image.AlbumImageLikesList.Any(u => u.User.Id == user.Id) ? true : false;
            }
            else 
            {
                imageToReturn.LikeCount = 0;
                imageToReturn.HasLiked = false;
            }

            if (image.AlbumImageCommentsList != null && image.AlbumImageCommentsList.Count > 0)
                imageToReturn.CommentCount = image.AlbumImageCommentsList.Count;
            else
                imageToReturn.CommentCount = 0;

            return Ok(imageToReturn);
        }

        [HttpPut]
        public ActionResult<AlbumImage> UpdateAlbumImage(Guid albumImageId, AlbumImageDTO albumImage) 
        {
            var aImage = _albumImageRepository.GetAlbumImageById(albumImageId);

            if (albumImage == null)
                return BadRequest(new { result = "no_album_image" });

            aImage.Image = albumImage.Image;
            aImage.IsEdited = true;
            aImage.CreatedOn = DateTime.Now;

            _albumImageRepository.UpdateAlbumImage(aImage);

            return Ok(new { result = "updated_albumImage" });
        }

        [HttpDelete]
        public ActionResult<AlbumImage> DeleteAlbumImageById(Guid albumImageId) 
        {
            var image = _albumImageRepository.GetAlbumImageById(albumImageId);

            if (image == null)
                return BadRequest(new { result = "album_image_does_not_exist" });

            _albumImageRepository.DeleteAlbumImage(image);

            return Ok(new { result = "deleted_albumImage" });
        }
    }
}
