using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationstatepagadoreparado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "32487a70-6096-4fcb-9218-ee7a6df78369");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "47bae431-a542-476a-9b3b-003e9a2a03bc");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "1150baee-80d2-4b98-b802-aede7023f9ac", new DateTime(2024, 3, 26, 0, 13, 47, 460, DateTimeKind.Utc).AddTicks(4861), "f5410ba8-f447-4bd2-ba6e-1ad13980064d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "15175522-d1cf-4209-be7c-9affd85a3b26", new DateTime(2024, 3, 26, 0, 13, 47, 460, DateTimeKind.Utc).AddTicks(4875), "11a82500-c98a-4e65-b57b-19854b74715d" });

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "PAGADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "ENTREGADO");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "7233d056-056f-4a7f-81f6-96836d5807f8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "52bbe242-2982-4665-9b6e-28d539053173");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "c10465c2-0f76-4c45-8707-f8c0b4deb70d", new DateTime(2024, 3, 25, 14, 56, 38, 488, DateTimeKind.Utc).AddTicks(25), "0f9bfc90-b3d4-403b-861f-15027bb8ba90" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "f3a8c384-2d33-4199-b36c-eeec1ad1d093", new DateTime(2024, 3, 25, 14, 56, 38, 488, DateTimeKind.Utc).AddTicks(38), "93abe71f-f694-411d-bcb6-0b3030a4d863" });

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "ENTREGADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "PAGADO");
        }
    }
}
