using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasev43 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserRequestId",
                table: "Notifications",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserRequestId",
                table: "Notifications",
                column: "UserRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserRequestId",
                table: "Notifications",
                column: "UserRequestId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserRequestId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_UserRequestId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "UserRequestId",
                table: "Notifications");
        }
    }
}
