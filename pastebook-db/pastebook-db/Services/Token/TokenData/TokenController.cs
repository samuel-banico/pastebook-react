using Microsoft.IdentityModel.Tokens;
using pastebook_db.Models;
using pastebook_db.Services.Token.TokenGenerator;

namespace pastebook_db.Services.Token.TokenData
{
    public class TokenController
    {
        private readonly GenerateAccessToken _generateAccessToken;
        private readonly TokenRepository _tokenRepository;

        public TokenController(GenerateAccessToken generateAccessToken, TokenRepository tokenrepository)
        {
            _generateAccessToken = generateAccessToken;
            _tokenRepository = tokenrepository;
        }

        public string Authenticate(User user)
        {
            // Adding our tokens
            string accessToken = _generateAccessToken.GenerateToken(user);

            UserToken userAccessToken = new UserToken()
            {
                Token = accessToken,
                UserId = user.Id
            };

            _tokenRepository.Create(userAccessToken);

            return accessToken;
        }

        public void DeleteAll(Guid userId) 
        {
            _tokenRepository.DeleteAll(userId);
        }
    }
}
