using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class payInPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShipmentAmounts");

            migrationBuilder.AddColumn<bool>(
                name: "PayInPerson",
                table: "Purchases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "State",
                table: "Purchases",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "af57a6ea-2fee-41bf-9bbc-c86efc9c105f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "adf26a86-80d8-4cdb-ae8d-517ac247228b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "aab76f62-fb35-42c8-8298-bc5a6c0669b8", new DateTime(2024, 4, 10, 23, 50, 38, 917, DateTimeKind.Utc).AddTicks(6799), "ccfbfa6e-247d-47f6-b07b-ddbce67d8266" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "01d96b8c-590e-4527-a09f-dc55b1715c94", new DateTime(2024, 4, 10, 23, 50, 38, 917, DateTimeKind.Utc).AddTicks(6809), "3f9afb3c-a910-4962-8a0e-07a5903643a4" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayInPerson",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Purchases");

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
    }
}
