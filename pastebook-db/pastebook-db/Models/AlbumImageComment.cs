namespace pastebook_db.Models
{
    public class AlbumImageComment
    {
        public Guid Id { get; set; }
        public string Comment { get; set; } = null!;
        public DateTime CreatedOn { get; set; }
        public bool IsEdited { get; set; }

        // Foreign Key
        public Guid AlbumImageId { get; set; }
        public virtual AlbumImage AlbumImage { get; set; } = null!;

        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }

    public class AlbumImageCommentDTO
    {
        public Guid? Id { get; set; }
        public string Comment { get; set; }
        public string? CreatedOn { get; set; }

        public Guid AlbumImageId { get; set; }
        public AlbumImage? AlbumImage { get; set; }
        public Guid? UserId { get; set; }
        public UserSendDTO? User { get; set; }
    }
}
