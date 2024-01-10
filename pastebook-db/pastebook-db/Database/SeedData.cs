using Microsoft.EntityFrameworkCore;
using pastebook_db.Models;

namespace pastebook_db.Database
{
    public class SeedData
    {
        public static void SeedDatabase(PastebookContext context)
        {
            /*context.Database.Migrate();

             if (!context.Users.Any())
             {
                 context.Users.AddRange(
                     new User()
                     {
                         FirstName = "Geo",
                         LastName = "Banico",
                         Email = "banico.sgl@gmail.com",
                         Password = BCrypt.Net.BCrypt.HashPassword("Geo.1234"),
                         Birthday = DateTime.Now,
                         Gender = Gender.Male,
                         MobileNumber = "09228378913",
                         ProfilePicture = File.ReadAllBytes("wwwroot/images/default_pic.png"),
                         IsActive = false,
                     }
                 );
             }

             context.SaveChanges();*/
        }
    }
}
