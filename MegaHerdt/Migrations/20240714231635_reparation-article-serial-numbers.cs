using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationarticleserialnumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReparationsArticlesSerialNumbers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReparationArticleId = table.Column<int>(type: "int", nullable: false),
                    ReparationArticleArticleId = table.Column<int>(type: "int", nullable: false),
                    ReparationArticleReparationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReparationsArticlesSerialNumbers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReparationsArticlesSerialNumbers_ReparationsArticles_ReparationArticleArticleId_ReparationArticleReparationId",
                        columns: x => new { x.ReparationArticleArticleId, x.ReparationArticleReparationId },
                        principalTable: "ReparationsArticles",
                        principalColumns: new[] { "ArticleId", "ReparationId" },
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_ReparationsArticlesSerialNumbers_ReparationArticleArticleId_ReparationArticleReparationId",
                table: "ReparationsArticlesSerialNumbers",
                columns: new[] { "ReparationArticleArticleId", "ReparationArticleReparationId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReparationsArticlesSerialNumbers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "0b0a919d-ba01-417a-9ee7-2d1b5fb4b1e9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "e5cc4ad1-7c88-46cd-890f-fe7d1b0864db");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "04fcc957-f6fd-4029-9ad9-9aca6f68aeb3", new DateTime(2024, 7, 12, 22, 55, 24, 971, DateTimeKind.Utc).AddTicks(3441), "52be6f0c-a00d-4315-923a-cfd4940e4e36" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "3cfc3859-23b0-4c29-84f6-6e0d1a44ed8b", new DateTime(2024, 7, 12, 22, 55, 24, 971, DateTimeKind.Utc).AddTicks(3461), "375d3650-ecd0-4ec6-9408-a2989c338742" });
        }
    }
}
