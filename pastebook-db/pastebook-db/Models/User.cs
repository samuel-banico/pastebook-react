using System.ComponentModel.DataAnnotations;

namespace pastebook_db.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime Birthday { get; set; }
        public Gender Gender { get; set; }
        public string? MobileNumber { get; set; }
        public string? ProfilePicture { get; set; }
        public string? UserBio { get; set; }

        public bool ViewPublicPost { get; set; }
        public bool IsCurrentlyActive { get; set; }
        public string Salt { get; set; }

        public ICollection<Friend>? FriendList { get; set; }
    }

    public class UserReceiveDTO
    {
        public Guid? Id { get; set; }
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string? Password { get; set; } = null!;
        public string? Birthday { get; set; } = null!;
        public int? Gender { get; set; }
        public string? UserBio { get; set; }
        public string? MobileNumber { get; set; }
        public IFormFile? ProfilePicture { get; set; }
    }

    public class EditUserReceiveGeneralDTO
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Birthday { get; set; }
        public int? Gender { get; set; }
        public bool ViewPublic {  get; set; }
    }

    public class EditUserReceiveSecurityDTO
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? MobileNumber { get; set; }
    }

    public class EditUserBioDTO 
    {
        public string? UserBio { get; set; }
    }

    public class UserSendDTO
    {
        public Guid? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Birthday { get; set; }
        public int? Gender { get; set; }
        public string? UserBio { get; set; }
        public string? MobileNumber { get; set; }
        public string? ProfilePicture { get; set; }
        public bool? ViewPublic { get; set; }

        public string Salt { get; set; }

        public int FriendCount { get; set; }
        public ICollection<UserSendDTO> Friends { get; set; }
    }

    //Login
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }

    public class UserLoginResponse
    {
        public Guid? id { get; set; }
        public string? token { get; set; }
        public string? email { get; set; }
    }
}
