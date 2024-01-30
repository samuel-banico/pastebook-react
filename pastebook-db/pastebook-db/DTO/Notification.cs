namespace pastebook_db.DTO
{
    public class NotificationToSend
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = null!;
        public string DateCreated { get; set; } = null!;

        public UserHomeDTO UserSent { get; set; } = null!;

        public Guid NavigationId { get; set; }
        public string NavigateTo { get; set; } = null!;

    }
}
