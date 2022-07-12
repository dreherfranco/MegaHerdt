using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class purchaseclaimanswer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PurchaseClaimAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PurchaseClaimId = table.Column<int>(type: "INTEGER", nullable: false),
                    Answer = table.Column<string>(type: "TEXT", nullable: false),
                    EmployeeUserName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseClaimAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PurchaseClaimAnswer_PurchasesClaims_PurchaseClaimId",
                        column: x => x.PurchaseClaimId,
                        principalTable: "PurchasesClaims",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "d2c0b44b-9877-4652-92a8-d473d16b727b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "4b529536-bfa5-4e26-bb46-693462766d98");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "REPARADO");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseClaimAnswer_PurchaseClaimId",
                table: "PurchaseClaimAnswer",
                column: "PurchaseClaimId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PurchaseClaimAnswer");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "447ecd5f-180f-4ad5-80e8-8472fa4adb7a");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "23c77590-bf90-4835-b55a-78a9471599cb");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "FINALIZADO");
        }
    }
}
