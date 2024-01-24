using Microsoft.IdentityModel.Tokens;
using pastebook_db.Models;
using pastebook_db.Services.Token.TokenGenerator;
using System.IdentityModel.Tokens.Jwt;

namespace pastebook_db.Services.Token.TokenData
{
    public class TokenController
    {
        private readonly GenerateAccessToken _generateAccessToken;

        public TokenController(GenerateAccessToken generateAccessToken)
        {
            _generateAccessToken = generateAccessToken;
        }

        public Guid? DecodeJwtToken(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(jwtToken) as JwtSecurityToken;

            if (jsonToken == null)
                return null;

            var userIdClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "UserId");

            if (userIdClaim == null)
                return null;

            if (Guid.TryParse(userIdClaim.Value, out var userId))
                return userId;
            else
                return null;
        }

        public string Authenticate(User user)
        {
            return _generateAccessToken.GenerateToken(user);
        }
    }
}
