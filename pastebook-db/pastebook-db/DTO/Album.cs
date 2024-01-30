using Microsoft.AspNetCore.Mvc;

namespace pastebook_db.DTO
{
    public class ProfileAlbumDisplayDTO 
    {
        public Guid Id { get; set; }
        public string? coverImage { get; set; }
        public string albumTitle { get; set; } = null!;
        public int imageCount { get; set; }
    }

    public class SingleAlbumDisplay 
    {
        public Guid Id { get; set; }
        public string AlbumName { get; set; } = null!;
        public string AlbumDescription { get; set; } = null!;
        public string DateCreated { get; set; } = null!;
        public int ImageCount { get; set; }
        public ICollection<Guid>? Images { get; set; }
    }

    public class SingleAlbumImageToDisplay
    {
        public Guid Id { get; set; }
        public string Image { get; set; } = null!;
    }

    public class AlbumImageToAdd 
    {
        public Guid AlbumId { get; set; }
        public IFormFile Image { get; set; }
    }

    public class AlbumImageDetails 
    {
        public Guid Id { get; set; }
        public string Image { get; set; } = null!;
        public string CreatedOn { get; set; } = null!;

        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        public bool HasLiked { get; set; }
    }
}
