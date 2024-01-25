using pastebook_db.Models;

namespace pastebook_db.DTO
{
    public class SimplePostDTO
    {
        public Guid? Id { get; set; }
        public string? Content { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public string CreatedOn { get; set; }

        public int? LikeCount { get; set; }
        public int? CommentCount { get; set; }
        public bool? HasLiked { get; set; }

        public Guid UserId { get; set; }
        public UserHomeDTO User { get; set; } = null!;


        public Guid? FriendId { get; set; }
        public UserHomeDTO? Friend { get; set; }
    }
}
