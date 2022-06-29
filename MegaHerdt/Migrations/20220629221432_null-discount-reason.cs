using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class nulldiscountreason : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleProviderSerialNumber_ArticlesProviders_ArticleProviderId",
                table: "ArticleProviderSerialNumber");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticleProviderSerialNumber",
                table: "ArticleProviderSerialNumber");

            migrationBuilder.RenameTable(
                name: "ArticleProviderSerialNumber",
                newName: "ArticlesProviderSerialNumbers");

            migrationBuilder.RenameIndex(
                name: "IX_ArticleProviderSerialNumber_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers",
                newName: "IX_ArticlesProviderSerialNumbers_ArticleProviderId");

            migrationBuilder.AlterColumn<string>(
                name: "DiscountReason",
                table: "ArticlesProviders",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticlesProviderSerialNumbers",
                table: "ArticlesProviderSerialNumbers",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "3baa93f8-fb29-440e-a485-f1d1ea0fe757");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "8caae9d2-ff24-4841-b2c1-8398a46989a4");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticlesProviders_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers",
                column: "ArticleProviderId",
                principalTable: "ArticlesProviders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviderSerialNumbers_ArticlesProviders_ArticleProviderId",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticlesProviderSerialNumbers",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.RenameTable(
                name: "ArticlesProviderSerialNumbers",
                newName: "ArticleProviderSerialNumber");

            migrationBuilder.RenameIndex(
                name: "IX_ArticlesProviderSerialNumbers_ArticleProviderId",
                table: "ArticleProviderSerialNumber",
                newName: "IX_ArticleProviderSerialNumber_ArticleProviderId");

            migrationBuilder.AlterColumn<string>(
                name: "DiscountReason",
                table: "ArticlesProviders",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticleProviderSerialNumber",
                table: "ArticleProviderSerialNumber",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "a8a55446-726e-4d7f-8178-1bf84b2a5514");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "b9e5adc2-de39-42a9-a3ac-964ec42b65b1");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleProviderSerialNumber_ArticlesProviders_ArticleProviderId",
                table: "ArticleProviderSerialNumber",
                column: "ArticleProviderId",
                principalTable: "ArticlesProviders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
