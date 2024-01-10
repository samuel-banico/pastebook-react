namespace pastebook_db.Models
{
    public class AlbumImage
    {
        public Guid Id { get; set; }
        public string Image { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        // Foreign Key
        public Guid? AlbumId { get; set; }
        public virtual Album? Album { get; set; } = null!;

        public ICollection<AlbumImageLike>? AlbumImageLikesList { get; set; }
        public ICollection<AlbumImageComment>? AlbumImageCommentsList { get; set; }
    }

    public class AlbumImageDTO
    {
        public Guid? Id { get; set; }
        public string? Image { get; set; } = null!;
        public string? CreatedOn { get; set; }
        public bool? IsEdited { get; set; }

        public int? LikeCount { get; set; }
        public int? CommentCount { get; set; }
        public bool HasLiked { get; set; }

        public Guid? AlbumId { get; set; }

        public ICollection<AlbumImageLikeDTO>? AlbumImageLikesList { get; set; }
        public ICollection<AlbumImageCommentDTO>? AlbumImageCommentsList { get; set; }
    }
}
