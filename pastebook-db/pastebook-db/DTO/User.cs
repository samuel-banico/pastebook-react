namespace pastebook_db.DTO
{
    // ---------------- RECEIVE
    /// <summary>
    /// A value to receive in the Security Settings ensuring to allow email, and password to edit.
    /// </summary>
    public class UserConfirmPassword
    {
        public string Password { get; set; } = null!;
    }

    public class ViewPublicReceive 
    {
        public bool ViewPublic { get; set; }
    }

    //----------------- SEND
    /// <summary>
    /// A value to send in the front-end to display in the settings menu 
    /// </summary>
    public class SettingsUserSend 
    {
        public Guid UserId { get; set; }

        public string? ProfilePicture { get; set; } = null!;

        public string Fullname { get; set; } = null!;

        public bool ViewPublicPost { get; set; }
    }

    public class FriendDetailsInFriendRequest 
    {
        public string DateCreated { get; set; } = null!;
        public UserHomeDTO RequestedUser { get; set; } = null!;
    }

    public class ProfileUser 
    {
        public Guid Id { get; set; }

        public string? ProfilePicture { get; set; }

        public string? Bio { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Birthday { get; set; }

        public int Gender { get; set; }

        public string? MobileNumber { get; set; }
    }

    public class SecurityUser 
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

}
