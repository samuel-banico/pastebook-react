using Microsoft.Extensions.FileProviders;

namespace pastebook_db.Models
{
    public class Album
    {
        public Guid Id { get; set; }
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }

        // Foreign Key
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public ICollection<AlbumImage>? AlbumImageList { get; set; }
    }

    public class AlbumDTO
    {
        public Guid? Id { get; set; }
        public string? AlbumName { get; set; }
        public string? AlbumDescription { get; set; }
        public bool? IsPublic { get; set; }
        public bool? IsEdited { get; set; }
        public string? CreatedOn { get; set; }
        public string? CoverAlbumImage { get; set; }

        public int? ImageCount { get; set; }
        public Guid UserId { get; set; }

        public ICollection<AlbumImageDTO>? ImageList { get; set; }
    }

    public class ReceiveImageDTO 
    {
        public Guid Id { get; set; }
        public IFormFile Image { get; set; }
    }
}
