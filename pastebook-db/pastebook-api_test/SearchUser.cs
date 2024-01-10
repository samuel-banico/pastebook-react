using Microsoft.AspNetCore.Hosting;
using Microsoft.VisualStudio.TestPlatform.Utilities;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Models;
using pastebook_db.Services.FunctionCollection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Abstractions;

namespace pastebook_api_test
{
    public class SearchUser
    {
        private readonly ITestOutputHelper output;

        public SearchUser(ITestOutputHelper output)
        {
            this.output = output;
        }

        [Fact]
        public void Test_RandomNumber() 
        {
            // Arrange
            var randomNumber = HelperFunction.GenerateRandomString();

            output.WriteLine(randomNumber);

            Assert.NotNull(randomNumber);
        }

        /*[Theory]
        [InlineData("j")]
        [InlineData("joe")]
        [InlineData("n")]
        [InlineData("N")]
        public void Test_SendingEmail(string toSearch)
        {
            // Arrange
            var userRepo = new HomeRepository(new PastebookContext());

            //Act
            var result = userRepo.GetSearchedUser(toSearch, );

            foreach (var item in result)
            {
                output.WriteLine($"{item.FirstName} {item.LastName}");
            }

            //Assert
            Assert.NotNull(result);
        }*/
    }
}
