using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class tipoobjeto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TipoObjeto",
                table: "Reparations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "19608002-15b3-4d9e-9f48-19d201c41069");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "aa0ab4ba-6bbd-47d0-b414-e6593a837bb2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "ce4c8ab3-3eb0-46ee-ae22-9bf5ba8e22b6", new DateTime(2024, 10, 15, 22, 14, 59, 979, DateTimeKind.Utc).AddTicks(29), "4b17122e-5db9-4858-a70d-c71414073dea" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "bdda3d54-28dd-4ad6-abd3-1dbbafc75edd", new DateTime(2024, 10, 15, 22, 14, 59, 979, DateTimeKind.Utc).AddTicks(45), "6f2305d2-5335-4aad-9b3e-4181ca6158a0" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoObjeto",
                table: "Reparations");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "cf0207f6-cddb-4777-a1c5-d9367929cb66");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "4b7f810b-75bf-4009-8dc7-9961a1182a1c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "2d48c8be-4224-4f53-aa1e-8b910ef8229c", new DateTime(2024, 7, 14, 23, 16, 34, 854, DateTimeKind.Utc).AddTicks(8642), "28c18098-4854-42f6-9055-535ab724d787" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "5e045f79-77f1-47ef-91d8-43ecc39d0d4c", new DateTime(2024, 7, 14, 23, 16, 34, 854, DateTimeKind.Utc).AddTicks(8656), "10096beb-019a-4642-89e4-b355abbfe75b" });
        }
    }
}
