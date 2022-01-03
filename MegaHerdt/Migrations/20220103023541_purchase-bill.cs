using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class purchasebill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PurchaseId",
                table: "Bills",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Purchases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BillId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Purchases", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "8d24b79b-15d8-46f1-b67d-6600a24112c4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "05c433b9-6e0a-4de7-ae0a-6f1ded9351b8");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_PurchaseId",
                table: "Bills",
                column: "PurchaseId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_Purchases_PurchaseId",
                table: "Bills",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_Purchases_PurchaseId",
                table: "Bills");

            migrationBuilder.DropTable(
                name: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Bills_PurchaseId",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "PurchaseId",
                table: "Bills");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "8e3475c8-a2fe-4a1b-b444-bf74dc888c19");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "71a1e56b-fecb-47ff-9d0e-485b3064ca69");
        }
    }
}
