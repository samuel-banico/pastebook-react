using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasv31 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserToken",
                table: "Tokens",
                newName: "Token");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Token",
                table: "Tokens",
                newName: "UserToken");
        }
    }
}
