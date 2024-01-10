using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pastebook_db.Migrations
{
    public partial class databasev42 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverAlbumImage",
                table: "Albums");

            migrationBuilder.AddColumn<bool>(
                name: "IsCurrentlyActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "AlbumImages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCurrentlyActive",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "CoverAlbumImage",
                table: "Albums",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "AlbumImages",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
