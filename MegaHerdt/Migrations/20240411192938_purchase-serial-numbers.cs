using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class purchaseserialnumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PurchasesArticlesSerialNumbers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PurchaseArticleId = table.Column<int>(type: "int", nullable: false),
                    PurchaseArticleArticleId = table.Column<int>(type: "int", nullable: false),
                    PurchaseArticlePurchaseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchasesArticlesSerialNumbers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchasesArticlesSerialNumbers_PurchasesArticles_PurchaseArticleArticleId_PurchaseArticlePurchaseId",
                        columns: x => new { x.PurchaseArticleArticleId, x.PurchaseArticlePurchaseId },
                        principalTable: "PurchasesArticles",
                        principalColumns: new[] { "ArticleId", "PurchaseId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "aeb71fb4-8b30-4b64-b95a-91cff225a440");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "1754c22d-ee2f-4dad-8370-b6fb7724cbb0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "faad6a63-4045-46ed-b40e-8bce522c4ab6", new DateTime(2024, 4, 11, 19, 29, 37, 607, DateTimeKind.Utc).AddTicks(8649), "8dc64a0c-4d12-4a56-8728-6beda85393f7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "fff7082e-2be8-4bc6-b7d3-4b57653183bd", new DateTime(2024, 4, 11, 19, 29, 37, 607, DateTimeKind.Utc).AddTicks(8663), "0fd031c2-6576-40b1-9df6-65b0d1a1ef70" });

            migrationBuilder.CreateIndex(
                name: "IX_PurchasesArticlesSerialNumbers_PurchaseArticleArticleId_PurchaseArticlePurchaseId",
                table: "PurchasesArticlesSerialNumbers",
                columns: new[] { "PurchaseArticleArticleId", "PurchaseArticlePurchaseId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchasesArticlesSerialNumbers");

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
    }
}
