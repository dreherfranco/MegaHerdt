using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class articlesproviderslist : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders");

            migrationBuilder.DropIndex(
                name: "IX_ArticlesProviders_ArticleId",
                table: "ArticlesProviders");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "ArticlesProviders");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "ArticlesProviders",
                type: "int",
                nullable: true);

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
                name: "IX_ArticlesProviders_ArticleId",
                table: "ArticlesProviders",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id");
        }
    }
}
