using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class FriendRequestRepository
    {
        private readonly PastebookContext _context;

        public FriendRequestRepository(PastebookContext context)
        {
            _context = context;
        }

        public FriendRequest? HasSentRequest(Guid userId, Guid friendId)
        {
            return _context.FriendRequests
                .FirstOrDefault(r => r.UserId == userId && r.User_FriendId == friendId || r.UserId == friendId && r.User_FriendId == userId);
        }

        public List<FriendRequest> GetAllFriendRequest(Guid id)
        {
            return _context.FriendRequests
                .Include(x => x.User_Friend)
                .Include(x => x.User)
                .Where(r => r.User_FriendId == id)
                .ToList();    
        }
         
        public void RequestFriend(FriendRequest req)
        {
            _context.FriendRequests.Add(req);
            _context.SaveChanges();
        }

        public FriendRequest? GetFriendRequest(Guid id)
        {
            return _context.FriendRequests
                .FirstOrDefault(u => u.Id == id);
        }

        public void DeleteFriendRequest(Guid friendRequestId) 
        {
            var rejectRequest = _context.FriendRequests.FirstOrDefault(f => f.Id == friendRequestId);

            if (rejectRequest != null)
            {
                _context.FriendRequests.Remove(rejectRequest);
                _context.SaveChanges();
            }
        }

        public void AddedFriend(Friend addFriend, FriendRequest req)
        {
            _context.Friends.Add(addFriend);
            _context.SaveChanges();

            DeleteFriendRequest(req.Id);
        }
    }
}
