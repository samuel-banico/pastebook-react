using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Database;
using pastebook_db.Models;

namespace pastebook_db.Services.Token.TokenData
{ 
    public class TokenRepository
    {
        private readonly PastebookContext _context;

        public TokenRepository(PastebookContext context)
        {
            _context = context;
        }

        public void Create(UserToken accessToken)
        {
            _context.Tokens.Add(accessToken);
            _context.SaveChanges();
        }

        public async Task Delete(Guid id)
        {
            // Query first then do remove.
            UserToken refreshToken = await _context.Tokens.FindAsync(id);
            if (refreshToken != null)
            {
                _context.Tokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
            }
        }

        public void DeleteAll(Guid userId)
        {
            IEnumerable<UserToken> refreshTokens = _context.Tokens
                .Where(t => t.UserId == userId)
                .ToList();

            _context.Tokens.RemoveRange(refreshTokens);
            _context.SaveChanges();
        }

        public async Task<UserToken> GetByToken(string token)
        {
            return await _context.Tokens.FirstOrDefaultAsync(t => t.Token == token);
        }
    }
}
