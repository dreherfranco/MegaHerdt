using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class gestionprovisiones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ArticleEditedDateTime",
                table: "Articles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ProvisionCreatedDateTime",
                table: "Articles",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "ProvisionPrice",
                table: "Articles",
                type: "real",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "3d9ca141-3769-4145-8757-093224ea525c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "d7a40af5-2e31-475d-8ff5-62750c1257f1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "2422204e-b54b-4dcb-8f50-ba51c22f99ff", new DateTime(2024, 6, 29, 21, 57, 56, 85, DateTimeKind.Utc).AddTicks(4425), "68becfa4-85f1-4732-9cc9-5d0da4f232b9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "5a0455a2-4acd-4462-aebe-17ad1154d2a2", new DateTime(2024, 6, 29, 21, 57, 56, 85, DateTimeKind.Utc).AddTicks(4440), "f7962048-8671-44f3-be31-ba9dafed1a66" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArticleEditedDateTime",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "ProvisionCreatedDateTime",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "ProvisionPrice",
                table: "Articles");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "5a78b3e9-463e-402e-bcca-235f45665960");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "ca39e56b-4280-4891-9aeb-4cbefd1289e3");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "8aa378b4-a5c0-49d3-93fc-fddd7bb69716", new DateTime(2024, 6, 28, 22, 22, 14, 411, DateTimeKind.Utc).AddTicks(901), "66a489bd-27c1-4fa6-97db-3403bac95fa7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "19d6a229-4a1e-490f-9d99-4de184b2fd7f", new DateTime(2024, 6, 28, 22, 22, 14, 411, DateTimeKind.Utc).AddTicks(914), "f9c9abcf-b0d7-47e0-ba2d-34ada33bb730" });
        }
    }
}
