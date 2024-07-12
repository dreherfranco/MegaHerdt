using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class articledescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Articles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Articles");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "485fb56b-648f-43c7-b281-7d36f1801539");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "067b9110-db12-46cb-9f5b-a3ea5f2ece51");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "91e13da2-5d49-4dfd-a90c-674ddcd6b007", new DateTime(2024, 7, 7, 23, 25, 11, 896, DateTimeKind.Utc).AddTicks(3934), "917d0133-2b53-48ca-b89c-f6189ba76e6f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "ad4528d3-52d7-469f-8877-59748d7d28da", new DateTime(2024, 7, 7, 23, 25, 11, 896, DateTimeKind.Utc).AddTicks(3949), "0da5e028-60c2-4ed8-9455-0f9880dc9d0b" });
        }
    }
}
