using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;
using System.Drawing;
using System.Net.Mail;
using System.Net;
using pastebook_db.Database;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class UserRepository
    {
        private readonly PastebookContext _context;

        public UserRepository(PastebookContext context)
        {
            _context = context;
        }

        public User? GetUserById(Guid id)
        {
            return _context.Users
                .Include(x => x.FriendList)
                .FirstOrDefault(x => x.Id == id);
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users
                .Include(x => x.FriendList)
                .FirstOrDefault(f => f.Email == email);
        }

        public User? GetUserByToken(string token) 
        {
            var userId = _context.Tokens
                .FirstOrDefault(t => t.Token == token);

            if (userId == null)
                return null;

            return _context.Users
                .Include(x => x.FriendList)
                .FirstOrDefault(u => u.Id == userId.UserId);
        }

        public List<User> GetAllUsers() 
        {
            return _context.Users.ToList();
        }

        //edit 
        public bool UpdateUser(User user, bool emailIsEditted)
        {
            bool hasSent = true;
            if (emailIsEditted)
            {
                string emailBody = @$"
                <html><body><b>New email Address!</b></br><p>Hey {user.FirstName} {user.LastName}. You have changed your email address, kindly use this email when accessing Pastebok.</p><p> See you in Pastebook :D</p></body></html>";

                hasSent = HelperFunction.SendEmail(user.Email, emailBody);
            }

            if (!hasSent)
                return hasSent;

            var existingEntity = _context.Set<User>().Local.SingleOrDefault(e => e.Id == user.Id);
            if (existingEntity != null)
            {
                _context.Entry(existingEntity).State = EntityState.Detached;
            }

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return hasSent;
        }

        public List<UserSendDTO> SortUserDTOByFullName(List<UserSendDTO> users) 
        {
            return users.OrderBy(u => ($"{u.FirstName} {u.LastName}")).ToList();
        }
    }
}
