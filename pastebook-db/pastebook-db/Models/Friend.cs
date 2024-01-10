namespace pastebook_db.Models
{
    public class Friend
    {
        public Guid Id { get; set; }
        public bool IsBlocked { get; set; }
        public DateTime CreatedOn { get; set; }

        // Foreign Key
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public Guid User_FriendId { get; set; }
        public virtual User User_Friend { get; set; }
    }
}
