using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;

namespace pastebook_db.Data
{
    public class AccessRepository
    {
        private readonly PastebookContext _context;
        private readonly UserRepository _userRepository;

        public AccessRepository(PastebookContext context, UserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;
        }

        public bool RegisterUser(User user)
        {
            string emailBody = $@"
        <html>
            <head>
                <style>
                    body {{
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }}
                    .container {{
                        width: 80%;
                        margin: auto;
                        overflow: hidden;
                    }}
                    header {{
                        background: #ffffff;
                        padding: 20px 0;
                        border-bottom: 1px solid #eeeeee;
                    }}
                    header img {{
                        max-width: 100%;
                        height: auto;
                        width: 150px; /* Set the desired width for the logo */
                        display: block;
                        margin: 0 auto; /* Center the logo */
                    }}
                    header h1 {{
                        margin: 0;
                        padding: 0;
                        color: #333;
                        font-size: 24px;
                    }}
                    section {{
                        width: 50%;
                        margin: auto;
                        padding: 20px 0;
                        color: #555;
                    }}
                    section p {{
                        font-size: 16px;
                        line-height: 1.6em;
                    }}
                    .cta-button {{
                        display: inline-block;
                        font-size: 16px;
                        color: #fff;
                        text-decoration: none;
                        background-color: #3498db;
                        padding: 10px 20px;
                        border-radius: 5px;
                    }}
                    footer {{
                        background: #ffffff;
                        padding: 10px 0;
                        text-align: center;
                        color: #555;
                    }}
                </style>
            </head>
            <body>
                <header>
                    <div class='container'>
                        <img src='https://cdn.discordapp.com/attachments/1139812638159818824/1176734926972924034/image.png?ex=656ff2cd&is=655d7dcd&hm=f2821e7a50bfd918decc75960e08e601dd7de8ca6ee281b5f55556baaeead7d1&' alt='Your Logo'>
                        <h1>Welcome to Pastebook!</h1>
                    </div>
                </header>
                <section>
                    <p>Dear {user.FirstName} {user.LastName},</p>
                    <p>We are thrilled to welcome you to Pastebook! Invite your friends and start sharing your memorable moments together on our platform.</p>
                    <p>See you in Pastebook! 😊</p>
                    <a class='cta-button' href='[INSERT_INVITE_URL]'>Invite Friends</a>
                </section>
                <footer>
                    <p>&copy; 2023 Pastebook. All rights reserved.</p>
                </footer>
            </body>
        </html>";

            if (!HelperFunction.SendEmail(user.Email, emailBody))
                return false;

            _context.Users.Add(user);
            _context.SaveChanges();

            return true;
        }
    }
}
