namespace pastebook_db.DTO
{
    public class Home
    {
        public UserHomeDTO User { get; set; } = null!;

        public ICollection<UserHomeDTO> OnlineFriends { get; set; } = null!;

        public ICollection<SimplePostDTO> Feed { get; set; } = null!;

        public bool HasFriendRequest { get; set; }

        public bool HasNotification { get; set; }
    }

    public class UserHomeDTO 
    {
        public string? ProfilePicture { get; set; } = null!;

        public Guid UserId { get; set; }

        public string Fullname { get; set; } = null!;
    }
}
