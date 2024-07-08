using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class paymentMethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Method",
                table: "PaymentMethods",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Method",
                table: "PaymentMethods");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "41fa6757-26c0-4d14-9e56-ca220d359305");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "739a753e-ff6f-4930-bd3b-0b54ea197b2e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "87d331d1-c745-4b50-8c50-d6e4ff64cdc9", new DateTime(2024, 6, 30, 23, 3, 8, 520, DateTimeKind.Utc).AddTicks(2284), "f4afa837-bcd9-4770-a643-bbc0be44eaef" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "ce79d4c3-4d93-437a-b92f-86df160e3fac", new DateTime(2024, 6, 30, 23, 3, 8, 520, DateTimeKind.Utc).AddTicks(2294), "ed1dec74-f56e-49a5-8646-2861913450e0" });
        }
    }
}
