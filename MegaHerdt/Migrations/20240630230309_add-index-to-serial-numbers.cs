using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class addindextoserialnumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SerialNumber",
                table: "ArticlesProviderSerialNumbers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_ArticlesProviderSerialNumbers_SerialNumber_IsDiscountStockOperation",
                table: "ArticlesProviderSerialNumbers",
                columns: new[] { "SerialNumber", "IsDiscountStockOperation" },
                unique: true,
                filter: "[SerialNumber] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ArticlesProviderSerialNumbers_SerialNumber_IsDiscountStockOperation",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.AlterColumn<string>(
                name: "SerialNumber",
                table: "ArticlesProviderSerialNumbers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "4f3ab956-7f8c-4adb-aea0-87a23f5d09ce");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "bb4ea829-d6a9-4049-9eac-1390256e4c17");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "63418808-9aeb-4abf-abfe-89319c3ecaa4", new DateTime(2024, 6, 30, 22, 57, 21, 293, DateTimeKind.Utc).AddTicks(1420), "50ba96ad-9116-42f4-bd75-5210d59b00dd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "6961db0b-ceec-4e72-92f8-b8fff7a4659f", new DateTime(2024, 6, 30, 22, 57, 21, 293, DateTimeKind.Utc).AddTicks(1437), "d9b5b9fb-6028-472a-a850-2054fc937514" });
        }
    }
}
