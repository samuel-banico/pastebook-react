using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Data
{
    public class HomeRepository
    {
        private readonly PastebookContext _context;

        public HomeRepository(PastebookContext context)
        {
            _context = context;
        }

        public List<User> getAllUser()
        {
            return _context.Users.ToList();
        }

        public List<User> GetSearchedUser(string toSearch, Guid loggedUserId)
        {
            var users = getAllUser()
                    .Where( u =>
                    ($"{u.FirstName} {u.LastName}").Contains(toSearch, StringComparison.OrdinalIgnoreCase) && u.Id != loggedUserId)
                    .ToList();

            return users;
        }

        public int GetFriendRequestCount(Guid userId) 
        {
            var friendReq = _context.FriendRequests
                    .Where(x => x.User_FriendId == userId)
                    .Count();

            return friendReq;
        }

        public int GetUnseenNotificationCount(Guid userId)
        {
            var notifCount = _context.Notifications
                    .Where(x => x.UserId == userId && x.HasSeen == false)
                    .Count();

            return notifCount;
        }
    }

}
