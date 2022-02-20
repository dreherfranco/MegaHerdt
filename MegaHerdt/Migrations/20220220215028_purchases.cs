using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class purchases : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "Purchases",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PurchasesArticles",
                columns: table => new
                {
                    ArticleId = table.Column<int>(type: "INTEGER", nullable: false),
                    PurchaseId = table.Column<int>(type: "INTEGER", nullable: false),
                    ArticleQuantity = table.Column<int>(type: "INTEGER", nullable: false),
                    ArticlePriceAtTheMoment = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchasesArticles", x => new { x.ArticleId, x.PurchaseId });
                    table.ForeignKey(
                        name: "FK_PurchasesArticles_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchasesArticles_Purchases_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchasesClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClientId = table.Column<string>(type: "TEXT", nullable: false),
                    PurchaseId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Answered = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchasesClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchasesClaims_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchasesClaims_Purchases_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransportCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Url = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransportCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AddressId = table.Column<int>(type: "INTEGER", nullable: false),
                    PurchaseId = table.Column<int>(type: "INTEGER", nullable: false),
                    TransportCompanyId = table.Column<int>(type: "INTEGER", nullable: true),
                    Amount = table.Column<float>(type: "REAL", nullable: false),
                    ShipmentDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TrackingNumber = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shipments_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipments_Purchases_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipments_TransportCompanies_TransportCompanyId",
                        column: x => x.TransportCompanyId,
                        principalTable: "TransportCompanies",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "9b961d1e-88e0-49a9-a0e3-8ac7a4b4be0a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "3e1a3a61-a0b6-49db-b855-3a8ddd567611");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ClientId",
                table: "Purchases",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchasesArticles_PurchaseId",
                table: "PurchasesArticles",
                column: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchasesClaims_ClientId",
                table: "PurchasesClaims",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchasesClaims_PurchaseId",
                table: "PurchasesClaims",
                column: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_AddressId",
                table: "Shipments",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_PurchaseId",
                table: "Shipments",
                column: "PurchaseId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_TransportCompanyId",
                table: "Shipments",
                column: "TransportCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_AspNetUsers_ClientId",
                table: "Purchases",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_AspNetUsers_ClientId",
                table: "Purchases");

            migrationBuilder.DropTable(
                name: "PurchasesArticles");

            migrationBuilder.DropTable(
                name: "PurchasesClaims");

            migrationBuilder.DropTable(
                name: "Shipments");

            migrationBuilder.DropTable(
                name: "TransportCompanies");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ClientId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Purchases");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "43589c4b-c48c-417a-90bd-6210aae76639");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "a80dbdf9-ddd0-4a74-8409-6f2e183fe447");
        }
    }
}
