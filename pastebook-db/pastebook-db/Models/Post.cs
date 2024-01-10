using System.ComponentModel.DataAnnotations;

namespace pastebook_db.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = null!;
        public bool IsPublic { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public Guid? FriendId { get; set; }
        public virtual Friend? Friend { get; set; }

        public ICollection<PostLike>? PostLikeList { get; set; }
        public ICollection<PostComment>? PostCommentList { get; set; }
    }

    public class PostReceiveDTO 
    {
        public string? Content { get; set; }
        public bool IsPublic { get; set; }
        public Guid UserId { get; set; }
        public Guid? FriendId { get; set; }
    }

    public class PostDTO
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
        public UserSendDTO User { get; set; }


        public Guid? FriendId { get; set; }
        public UserSendDTO? Friend { get; set; }

        public ICollection<PostLikeDTO>? PostLikeList { get; set; }
        public ICollection<PostCommentDTO>? PostCommentList { get; set; }
    }
}
