using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pastebook_db.Controllers;
using pastebook_db.Data;
using pastebook_db.Database;
using pastebook_db.Models;
using System.Collections;
using Xunit.Abstractions;

namespace pastebook_api_test
{
    public class HomeControllerTest
    {
        private readonly ITestOutputHelper output;

        public HomeControllerTest(ITestOutputHelper output)
        {
            this.output = output;
        }

        /*[Theory]
        [InlineData("j")]
        [InlineData("joe")]
        public void Test_SearchUserByString(string itemToSearch)
        {
            // Arrange
            var controller = new HomeController(new HomeRepository(new PastebookContext()));
            
            // Act
            var result = controller.SearchUserByString(itemToSearch).Result as OkObjectResult;

            foreach (var item in result.Value as List<User>)
            {
                output.WriteLine($"{item.FirstName} {item.LastName}");
            }

            // Assert
            Assert.NotNull(result);
        }*/
    }
}