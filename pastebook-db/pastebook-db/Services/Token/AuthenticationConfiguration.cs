namespace pastebook_db.Services.Token
{
    public class AuthenticationConfiguration
    {
        public string AccessTokenSecret { get; set; } = null!;
        public int AccessTokenExpirationMinutes { get; set; }
        public string Issuer { get; set; } = null!;
        public string Audience { get; set; } = null!;
    }
}
