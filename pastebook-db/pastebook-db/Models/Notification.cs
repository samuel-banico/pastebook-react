namespace pastebook_db.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public bool HasSeen { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Content { get; set; } = null!;

        // Foreign Key
        // user to receive the notification
        public Guid? UserId { get; set; }
        public virtual User? User { get; set; }

        // Notifications they will receive

        // the user who acted the action (Friend Request, Like, and Comment)
        public Guid? UserRequestId { get; set; }
        public virtual User? UserRequest { get; set; }

        // Will not be null when user has Post Like and Comment
        public Guid? PostId { get; set; }
        public virtual Post? Post { get; set; }

        // Will not be null when user has Album Like and Comment 
        public Guid? AlbumId { get; set; }
        public virtual Album? Album { get; set; }
    }

    public class NotifDTO
    {
        public Guid? Id { get; set; }
        public bool? HasSeen {get; set;}
        public string? NotificationDate { get; set; }
        public string? Content { get; set; }

        //FKs
        public Guid? UserId { get; set; }
        public UserSendDTO? User { get; set; }

        public Guid? PostId { get; set; }
        public Post? Post { get; set; }

        public Guid? AlbumId { get; set; }
        public Post? Album { get; set; }

        public Guid? UserRequestId {  get; set; }
        public UserSendDTO? UserRequest { get; set; }
    }

    public class SetSeenNotifDTO 
    {
        public Guid? Id { get; set; }
    }
}
