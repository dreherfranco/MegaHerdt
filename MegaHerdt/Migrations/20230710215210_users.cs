using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class users : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "e7416a23-7328-4472-a6c0-686e3f5684e0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "6b3daea4-0801-4b3b-9700-05b342177aba");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "15b0d673-3c84-403c-a7d4-ce645139faa5", new DateTime(2023, 7, 10, 21, 52, 9, 863, DateTimeKind.Utc).AddTicks(5282), "41077192-6b01-4efc-a49f-f0deb4fedb08" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedDate", "Dni", "Email", "EmailConfirmed", "Enabled", "IsActive", "LastLogin", "LockoutEnabled", "LockoutEnd", "Name", "NormalizedEmail", "NormalizedUserName", "Password", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Surname", "TwoFactorEnabled", "UserName" },
                values: new object[] { "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe", 0, "55c82325-70d6-45ef-9421-84f310438600", new DateTime(2023, 7, 10, 21, 52, 9, 863, DateTimeKind.Utc).AddTicks(5295), "45698746", "conefecto77@gmail.com", false, true, true, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, null, "Tomi", "CONEFECTO77@GMAIL.COM", "CONEFECTO77@GMAIL.COM", "HbUx5+Ac8aaOfKLSxrpaTQ8uMV9Iz/ty5pBaJINg5Fc=", "AQAAAAEAACcQAAAAEMfyNTA180vxZ2Log08brPlw6oav6rL7mDtMn2Dv22mlg+eRjRRRtNMSCA4aoAvyNA==", null, false, "217b3aaa-15f8-4c8f-9b22-afa9a4d7c78a", "Zappa", false, "conefecto77@gmail.com" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "629fe46e-02b4-4c08-9879-413ef831b12a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "7b95cbf8-e791-41ca-b963-160147510299");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "e19ade18-b08c-49ba-9a23-2b8bdfb1be55", new DateTime(2023, 7, 10, 2, 14, 27, 37, DateTimeKind.Utc).AddTicks(4299), "42bf099f-b982-47e0-aaae-b732850cbf9a" });
        }
    }
}
