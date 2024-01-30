using pastebook_db.Models;

namespace pastebook_db.DTO
{
    /// <summary>
    /// A data to be send to the front-end. A much simplified version of POSTDTO which does not contain any CommentList or LikeList
    /// </summary>
    public class SimplePostDTO
    {
        public Guid Id { get; set; }
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

    public class CommentedOnPost 
    {
        public Guid PostId {  get; set; }
        public string Comment { get; set; } = null!;
    }

    public class SinglePostCommentDTO 
    {
        public string Comment { get; set; } = null!;
        public string CreatedOn { get; set; } = null!;
        public UserHomeDTO User { get; set; } = null!;
    }
}
