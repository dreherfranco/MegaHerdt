using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class enstock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviders_Providers_ProviderId",
                table: "ArticlesProviders");

            migrationBuilder.AddColumn<bool>(
                name: "EnStock",
                table: "ArticlesProviderSerialNumbers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "ProviderId",
                table: "ArticlesProviders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "7233d056-056f-4a7f-81f6-96836d5807f8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "52bbe242-2982-4665-9b6e-28d539053173");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48c-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "c10465c2-0f76-4c45-8707-f8c0b4deb70d", new DateTime(2024, 3, 25, 14, 56, 38, 488, DateTimeKind.Utc).AddTicks(25), "0f9bfc90-b3d4-403b-861f-15027bb8ba90" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7c2e2a04-d48d-4dd7-a3b9-4474c400dcbe",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "SecurityStamp" },
                values: new object[] { "f3a8c384-2d33-4199-b36c-eeec1ad1d093", new DateTime(2024, 3, 25, 14, 56, 38, 488, DateTimeKind.Utc).AddTicks(38), "93abe71f-f694-411d-bcb6-0b3030a4d863" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviders_Providers_ProviderId",
                table: "ArticlesProviders",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticlesProviders_Providers_ProviderId",
                table: "ArticlesProviders");

            migrationBuilder.DropColumn(
                name: "EnStock",
                table: "ArticlesProviderSerialNumbers");

            migrationBuilder.AlterColumn<int>(
                name: "ProviderId",
                table: "ArticlesProviders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_ArticlesProviders_Providers_ProviderId",
                table: "ArticlesProviders",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
