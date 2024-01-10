namespace pastebook_db.Models
{
    public class AlbumImageLike
    {
        public Guid Id { get; set; }

        // Foreign Key
        public Guid AlbumImageId { get; set; }
        public virtual AlbumImage AlbumImage { get; set; } = null!;

        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
    }

    public class AlbumImageLikeDTO
    {
        public Guid? Id { get; set; }

        public Guid AlbumImageId { get; set; }
        public AlbumImage? AlbumImage { get; set; }
        public Guid UserId { get; set; }
        public UserSendDTO? User { get; set; }
    }
}
