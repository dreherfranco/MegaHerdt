using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class paymentmethod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "890a7ea8-3db1-4031-8405-6f2f326cc709");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "05c0f707-ac63-4411-84ce-46ff57428804");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "c1a51332-43b2-4432-ae5a-7b81e01e4125", new DateTime(2024, 4, 14, 21, 41, 3, 164, DateTimeKind.Utc).AddTicks(4550), "d1109d90-fd01-41b2-9fd3-4eb4b69d6533" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "6442c60c-320b-449f-8db6-856ef4f7e436", new DateTime(2024, 4, 14, 21, 41, 3, 164, DateTimeKind.Utc).AddTicks(4564), "ab27f9bd-be06-44ca-bc3f-9200c67552e4" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "4c889af6-7d2b-4348-9339-b430cb679cb8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "a428068a-cf22-4d1b-8f53-21720670fe68");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "541ffa5f-4dc4-4c73-ac0b-d7bd3088ab90", new DateTime(2024, 4, 11, 21, 16, 37, 696, DateTimeKind.Utc).AddTicks(6851), "2c077507-d8dc-438d-9b3f-23f3d3481efa" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "f0bf4db8-2f8e-40f6-bdd3-4429c7a8140b", new DateTime(2024, 4, 11, 21, 16, 37, 696, DateTimeKind.Utc).AddTicks(6861), "bc513dca-d36d-4877-bce3-8ce5db173f8d" });
        }
    }
}
