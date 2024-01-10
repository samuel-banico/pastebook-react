using Google.Apis.Drive.v3.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class NotificationRepository
    {
        private readonly PastebookContext _context;
        private readonly FriendRepository _friendRepository;

        public NotificationRepository(PastebookContext context, FriendRepository friendRepository)
        {
            _context = context;
            _friendRepository = friendRepository;
        }

        // Get All Notifications
        public List<Notification> GetAllNotifications(Guid userId)
        {
            var notif = _context.Notifications
                .Include(n => n.User)
                .Include(n => n.UserRequest)
                .Include(n => n.Post)
                .Include(n => n.Album)
                .Where(n => n.UserId == userId)
                .OrderByDescending(p => p.NotificationDate).ToList();

            return notif;
        }

        // Get Unseen Notification
        public List<Notification> GetUnseenNotifications(Guid userId) 
        {
            var notif = _context.Notifications
                    .Include(n => n.User)
                    .Include(n => n.UserRequest)
                    .Include(n => n.Post)
                    .Include(n=>n.Album)
                    .Where(n => n.UserId == userId && n.HasSeen == false)
                    .OrderByDescending(p => p.NotificationDate)
                    .ToList();
            return notif;
        }


        // Get Seen Notification

        public void SeenNotification(Guid? notifId)
        {
            var notif = _context.Notifications.FirstOrDefault(n => n.Id == notifId);

            if (notif != null) 
            {
                notif.HasSeen = true;

                _context.Entry(notif).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        // Clear Seen Notifs
        public void ClearNotification(Guid userId)
        {
            var notif = GetUnseenNotifications(userId);

            foreach (var item in notif)
            {
                item.HasSeen = true;

                _context.Entry(item).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }

        // --- Other Methods
        // --- Create Notification
        // Added
        public void CreateNotifFriendRequest(FriendRequest friendRequest)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.UserId = friendRequest.User_FriendId;
            newNotif.UserRequestId = friendRequest.UserId;

            newNotif.Content = $"Has sent you a friend request";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifAcceptedFriendRequest(Guid userId, Guid friendId)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.UserId = userId;
            newNotif.UserRequestId= friendId;

            newNotif.Content = $"Accepted your friend request";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifFromFriendPostInTimeline(Post post, Guid? friendId) 
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = post.Id;
            newNotif.UserId = post.UserId;
            newNotif.UserRequestId = friendId;
            newNotif.Content = $"Has posted on your timeline.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        public NotifDTO NotifToNotifDTO(Notification notif) 
        {
            var newNotif = new NotifDTO();
            newNotif.Id = notif.Id;
            newNotif.HasSeen = notif.HasSeen;
            newNotif.NotificationDate = HelperFunction.TimeDifference(notif.NotificationDate, DateTime.Now);
            newNotif.Content = notif.Content;
            newNotif.UserId = notif.UserId;
            newNotif.PostId = notif.PostId;
            newNotif.AlbumId = notif.AlbumId;

            if (notif.UserRequest != null) 
            {
                newNotif.UserRequestId = notif.UserRequestId;
                newNotif.UserRequest = _friendRepository.ConvertUserToUserSendDTO(notif.UserRequest);
            }
            

            return newNotif;
        }

        // Added
        public void CreateNotifPostLike(PostLike postLike)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = postLike.PostId;
            newNotif.UserId = getPostFromPostId(postLike.PostId).UserId;
            newNotif.UserRequestId = postLike.UserId;

            newNotif.Content = $"Has reacted to your post";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Added
        public void CreateNotifPostComment(PostComment postComment)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;
            newNotif.PostId = postComment.PostId;
            newNotif.UserId = getPostFromPostId(postComment.PostId).UserId;
            newNotif.UserRequestId = postComment.UserId;
            newNotif.Content = $"Has left a comment on your post";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }


        public void CreateNotifAlbumImageLike(AlbumImageLike albumImageLike)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;

            var album = getAlbumFromAlbumImageId(albumImageLike.AlbumImageId);
            newNotif.AlbumId = album.Id;
            newNotif.UserId = album.UserId;

            newNotif.UserRequestId = albumImageLike.UserId;
            newNotif.Content = $"Has reacted on your album.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }


        public void CreateNotifAlbumImageComment(AlbumImageComment albumImageComment)
        {
            var newNotif = new Notification();
            newNotif.HasSeen = false;
            newNotif.NotificationDate = DateTime.Now;

            var album = getAlbumFromAlbumImageId(albumImageComment.AlbumImageId);
            newNotif.AlbumId = album.Id;
            newNotif.UserId = album.UserId;

            newNotif.UserRequestId = albumImageComment.UserId;
            newNotif.Content = $"Has left a comment on your album.";

            _context.Notifications.Add(newNotif);
            _context.SaveChanges();
        }

        // Helper methods
        private Post getPostFromPostId(Guid postId) 
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == postId);
            return post;
        }

        private Album getAlbumFromAlbumImageId(Guid albumImageId) 
        {
            var albumImage = _context.AlbumImages
                                .Include(a => a.Album)
                                .FirstOrDefault(aI => aI.Id == albumImageId);

            return albumImage.Album;
        }
    }
}
