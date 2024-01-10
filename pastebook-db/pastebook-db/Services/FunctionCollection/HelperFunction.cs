using System.Net.Mail;
using System.Net;
using pastebook_db.Models;

namespace pastebook_db.Services.FunctionCollection
{
    public class HelperFunction
    {
        public static string? SendImageToAngular(string? filePath)
        {
            if (filePath == null)
                return null;

            byte[] imageData = System.IO.File.ReadAllBytes(filePath);

            return $"data:image/png;base64,{Convert.ToBase64String(imageData)}";
        }

        public static string SaveImageToLocalStorage(IFormFile? file)
        {
            string fileName;
            string filePath = Path.Combine("wwwroot", "images");

            if (file == null)
            {
                fileName = "default.png";
                filePath = Path.Combine(filePath, fileName);
            }
            else
            {
                fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                filePath = Path.Combine(filePath, fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                    file.CopyTo(fileStream);
            }

            return filePath;
        }

        public static bool RemoveImageFromLocalStorage(string filePath)
        {
            //var fullPath = Path.Combine(_environment.WebRootPath, filePath);

            var fullPath = filePath;

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
                return true;
            }

            return false;
        }

        //Method for Sending email
        public static bool SendEmail(string email, string emailBody)
        {
            //Send email
            string fromEmail = "pastebook2023@gmail.com";
            string fromPassword = "lrtvwngzwminepyd";

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress(fromEmail);
            msg.Subject = "Welcome to Pastebook";
            msg.To.Add(new MailAddress(email));
            msg.Body = emailBody;
            msg.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromEmail, fromPassword),
                EnableSsl = true
            };

            bool isEmailSent = true;

            smtpClient.SendCompleted += (sender, e) =>
            {
                if (e.Error != null)
                    isEmailSent = false;
                else if (e.Cancelled)
                    isEmailSent = false;
            };

            try
            {
                smtpClient.Send(msg);
            }
            catch (Exception)
            {
                isEmailSent = false;
            }

            return isEmailSent;
        }

        public static string TimeDifference(DateTime past, DateTime now)
        {
            TimeSpan diff = (now - past);
            var seconds = diff.TotalSeconds;

            if (seconds / 31536000 >= 2)
                return $"{(int)(seconds / 31536000)} years ago";

            else if (seconds / 31536000 >= 1)
                return $"a year ago";

            else if (seconds / 2629746 >= 2)
                return $"{(int)(seconds / 2629746)} months ago";

            else if (seconds / 2629746 >= 1)
                return $"a month ago";

            else if (seconds / 604800 >= 2)
                return $"{(int)(seconds / 604800)} weeks ago";

            else if (seconds / 604800 >= 1)
                return $"a week ago";

            else if (seconds / 86400 >= 2)
                return $"{(int)(seconds / 86400)} days ago";

            else if (seconds / 86400 >= 1)
                return $"a day ago";

            else if (seconds / 3600 >= 2)
                return $"{(int)(seconds / 3600)} hours ago";

            else if (seconds / 3600 >= 1)
                return $"an hour ago";

            else if (seconds / 60 >= 2)
                return $"{(int)(seconds / 60)} minutes ago";

            else if (seconds / 60 >= 1)
                return $"a minute ago";

            else if (seconds >= 2)
                return $"{(int)(seconds)} seconds ago";

            return $"a second ago";
        }

        public static string GenerateRandomString()
        {
            string lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            string uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string numericChars = "0123456789";

            string allChars = lowercaseChars + uppercaseChars + numericChars;

            Random random = new Random();
            char[] randomArray = new char[6];

            // Ensure at least one character from each character set
            randomArray[0] = lowercaseChars[random.Next(lowercaseChars.Length)];
            randomArray[1] = uppercaseChars[random.Next(uppercaseChars.Length)];
            randomArray[2] = numericChars[random.Next(numericChars.Length)];

            // Fill the remaining characters randomly
            for (int i = 3; i < 6; i++)
            {
                randomArray[i] = allChars[random.Next(allChars.Length)];
            }

            // Shuffle the array to randomize the order of characters
            for (int i = 0; i < randomArray.Length - 1; i++)
            {
                int j = random.Next(i, randomArray.Length);
                char temp = randomArray[i];
                randomArray[i] = randomArray[j];
                randomArray[j] = temp;
            }

            return new string(randomArray);
        }
    }

    
}
