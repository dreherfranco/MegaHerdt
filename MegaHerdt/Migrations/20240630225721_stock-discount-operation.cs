using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class stockdiscountoperation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDiscountStockOperation",
                table: "ArticlesProviderSerialNumbers",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDiscountStockOperation",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "3d9ca141-3769-4145-8757-093224ea525c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "d7a40af5-2e31-475d-8ff5-62750c1257f1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "2422204e-b54b-4dcb-8f50-ba51c22f99ff", new DateTime(2024, 6, 29, 21, 57, 56, 85, DateTimeKind.Utc).AddTicks(4425), "68becfa4-85f1-4732-9cc9-5d0da4f232b9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "5a0455a2-4acd-4462-aebe-17ad1154d2a2", new DateTime(2024, 6, 29, 21, 57, 56, 85, DateTimeKind.Utc).AddTicks(4440), "f7962048-8671-44f3-be31-ba9dafed1a66" });
        }
    }
}
