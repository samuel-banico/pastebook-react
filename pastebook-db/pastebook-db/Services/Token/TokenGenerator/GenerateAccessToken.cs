using Microsoft.IdentityModel.Tokens;
using pastebook_db.Models;
using System.Security.Claims;
using System.Text;

namespace pastebook_db.Services.Token.TokenGenerator
{
    public class GenerateAccessToken
    {
        private readonly AuthenticationConfiguration _configuration;
        private readonly GenerateToken _generateToken;

        public GenerateAccessToken(AuthenticationConfiguration configuration, GenerateToken generateToken)
        {
            _configuration = configuration;
            _generateToken = generateToken;
        }

        // This will generate our token.
        public string GenerateToken(User user)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.AccessTokenSecret));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            return _generateToken.GenerateUserToken(
                _configuration.AccessTokenSecret,
                _configuration.Issuer,
                _configuration.Audience,
                _configuration.AccessTokenExpirationMinutes,
                claims);
        }
    }
}
