using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class nrofactura : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Bills",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "81e88a5a-32fb-46f0-ac9a-89f522d28af9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "d4955c8c-590b-4628-9ce0-44bd96d177b0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "Bills",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "5e179144-a03b-435b-a52b-f03b3a4c7ebc");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "c362034d-63e0-4739-8cb4-1c07d0c3eab0");
        }
    }
}
