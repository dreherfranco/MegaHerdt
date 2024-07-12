using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationdiagnostic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Diagnostic",
                table: "Reparations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "0b0a919d-ba01-417a-9ee7-2d1b5fb4b1e9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "e5cc4ad1-7c88-46cd-890f-fe7d1b0864db");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "04fcc957-f6fd-4029-9ad9-9aca6f68aeb3", new DateTime(2024, 7, 12, 22, 55, 24, 971, DateTimeKind.Utc).AddTicks(3441), "52be6f0c-a00d-4315-923a-cfd4940e4e36" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "3cfc3859-23b0-4c29-84f6-6e0d1a44ed8b", new DateTime(2024, 7, 12, 22, 55, 24, 971, DateTimeKind.Utc).AddTicks(3461), "375d3650-ecd0-4ec6-9408-a2989c338742" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Diagnostic",
                table: "Reparations");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "509b5d9b-699c-4d66-9a85-03296dfc47e4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "102ad922-8f68-4f05-b39b-adac9a61e17a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "e51fef21-08b1-43cc-8db0-7d1dbcb5025f", new DateTime(2024, 7, 12, 0, 2, 14, 237, DateTimeKind.Utc).AddTicks(818), "13371d14-0884-4fe5-93c1-15621d6de08c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "2036adfa-cfbe-4bb8-bba3-ae273abc7cef", new DateTime(2024, 7, 12, 0, 2, 14, 237, DateTimeKind.Utc).AddTicks(834), "9d1c8892-a77d-454f-b972-66af1d698051" });
        }
    }
}
