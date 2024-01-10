namespace pastebook_db.Services.PasswordHash
{
    public interface IPasswordHash
    {
        string HashPassword(string password);

        bool VerifyPassword(string password, string passwordHash);
    }
}
