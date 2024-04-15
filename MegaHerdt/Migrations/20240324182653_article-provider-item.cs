using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class articleprovideritem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticlesProviders_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.DropColumn(
                name: "ArticleQuantity",
                table: "ArticlesProviders");

            migrationBuilder.RenameColumn(
                name: "ArticleProviderId",
                table: "ArticlesProviderSerialNumbers",
                newName: "ArticleProviderItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ArticlesProviderSerialNumbers_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers",
                newName: "IX_ArticlesProviderSerialNumbers_ArticleProviderItemId");

            migrationBuilder.AlterColumn<int>(
                name: "ArticleId",
                table: "ArticlesProviders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "ArticleProviderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArticleId = table.Column<int>(type: "int", nullable: false),
                    ArticleQuantity = table.Column<int>(type: "int", nullable: false),
                    PurchasePrice = table.Column<float>(type: "real", nullable: false),
                    ProvisionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleProviderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleProviderItems_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArticleProviderItems_ArticlesProviders_ProvisionId",
                        column: x => x.ProvisionId,
                        principalTable: "ArticlesProviders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "d0dd8b86-2736-447d-aabe-a2dce62d7202");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "f212dcc9-3e72-459a-8c2e-dbb2dd0ee21a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "9c153fad-c5c9-4d00-b9ee-3da43de175fd", new DateTime(2024, 3, 24, 18, 26, 53, 417, DateTimeKind.Utc).AddTicks(1766), "ce383a01-ebdb-40b8-bf6d-e75cd38213fc" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "4b5fb8fb-a748-4602-a3ab-a7a936503781", new DateTime(2024, 3, 24, 18, 26, 53, 417, DateTimeKind.Utc).AddTicks(1780), "2ce8fa09-d23c-4efb-b689-011e034a424d" });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleProviderItems_ArticleId",
                table: "ArticleProviderItems",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_ArticleProviderItems_ProvisionId",
                table: "ArticleProviderItems",
                column: "ProvisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticleProviderItems_ArticleProviderItemId",
                table: "ArticlesProviderSerialNumbers",
                column: "ArticleProviderItemId",
                principalTable: "ArticleProviderItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticleProviderItems_ArticleProviderItemId",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.DropTable(
                name: "ArticleProviderItems");

            migrationBuilder.RenameColumn(
                name: "ArticleProviderItemId",
                table: "ArticlesProviderSerialNumbers",
                newName: "ArticleProviderId");

            migrationBuilder.RenameIndex(
                name: "IX_ArticlesProviderSerialNumbers_ArticleProviderItemId",
                table: "ArticlesProviderSerialNumbers",
                newName: "IX_ArticlesProviderSerialNumbers_ArticleProviderId");

            migrationBuilder.AlterColumn<int>(
                name: "ArticleId",
                table: "ArticlesProviders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ArticleQuantity",
                table: "ArticlesProviders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "e7416a23-7328-4472-a6c0-686e3f5684e0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "6b3daea4-0801-4b3b-9700-05b342177aba");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "15b0d673-3c84-403c-a7d4-ce645139faa5", new DateTime(2023, 7, 10, 21, 52, 9, 863, DateTimeKind.Utc).AddTicks(5282), "41077192-6b01-4efc-a49f-f0deb4fedb08" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "55c82325-70d6-45ef-9421-84f310438600", new DateTime(2023, 7, 10, 21, 52, 9, 863, DateTimeKind.Utc).AddTicks(5295), "217b3aaa-15f8-4c8f-9b22-afa9a4d7c78a" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviders_Articles_ArticleId",
                table: "ArticlesProviders",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticlesProviders_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers",
                column: "ArticleProviderId",
                principalTable: "ArticlesProviders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
