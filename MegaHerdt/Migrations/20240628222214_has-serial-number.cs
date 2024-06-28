using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class hasserialnumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasSerialNumber",
                table: "Articles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "5a78b3e9-463e-402e-bcca-235f45665960");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "ca39e56b-4280-4891-9aeb-4cbefd1289e3");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "8aa378b4-a5c0-49d3-93fc-fddd7bb69716", new DateTime(2024, 6, 28, 22, 22, 14, 411, DateTimeKind.Utc).AddTicks(901), "66a489bd-27c1-4fa6-97db-3403bac95fa7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "19d6a229-4a1e-490f-9d99-4de184b2fd7f", new DateTime(2024, 6, 28, 22, 22, 14, 411, DateTimeKind.Utc).AddTicks(914), "f9c9abcf-b0d7-47e0-ba2d-34ada33bb730" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasSerialNumber",
                table: "Articles");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "1d519295-af9f-43ac-8143-68c7878a0f7d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "4d89ce03-0c90-46b2-9eb5-c3324e6e0a3e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "b104d31c-b482-42d1-8380-9534f70b19a8", new DateTime(2024, 4, 14, 21, 43, 55, 228, DateTimeKind.Utc).AddTicks(1450), "eb2444b4-e0bf-4023-9f62-f969d95e6e3e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "fcaf63f0-1357-45ce-90d0-558b72dc2013", new DateTime(2024, 4, 14, 21, 43, 55, 228, DateTimeKind.Utc).AddTicks(1460), "b30daef0-2f0a-4247-9410-28ec63f70d45" });
        }
    }
}
