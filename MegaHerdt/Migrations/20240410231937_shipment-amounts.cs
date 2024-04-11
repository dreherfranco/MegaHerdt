using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class shipmentamounts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShipmentAmounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Department = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PostalCode = table.Column<int>(type: "int", nullable: false),
                    Province = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TownName = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShipmentAmounts", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "a7520d94-45d9-48ba-bd49-2ec0814c5b85");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "4ec0031e-38a8-4ffa-9218-9466dafe6e4d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "3eca0294-cf01-4ba6-84ba-de7242f1475c", new DateTime(2024, 4, 10, 23, 19, 36, 520, DateTimeKind.Utc).AddTicks(8986), "d962e8a5-5380-436b-ade5-6ef0c7415b14" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "6683f1da-a4ff-43b2-9509-a53a6f6d1b15", new DateTime(2024, 4, 10, 23, 19, 36, 520, DateTimeKind.Utc).AddTicks(9000), "eb00c885-9af0-4459-a70d-6ae5093c132b" });

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentAmounts_Province_Department_TownName",
                table: "ShipmentAmounts",
                columns: new[] { "Province", "Department", "TownName" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShipmentAmounts");

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
        }
    }
}
