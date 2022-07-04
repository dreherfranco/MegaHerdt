using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationstates2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "fd650458-223b-4338-9c37-c2047efcb771");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "9ca5db09-360e-4483-b05a-18cbd9cd81bb");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "FINALIZADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "ENTREGADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "PAGADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 8,
                column: "Name",
                value: "CANCELADO");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "28752508-f6f3-490a-9447-b471ad9dbae4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "c3ac4c43-3e13-4754-9386-32d2b79a4da6");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 5,
                column: "Name",
                value: "EN REPARACION");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 6,
                column: "Name",
                value: "FINALIZADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 7,
                column: "Name",
                value: "ENTREGADO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 8,
                column: "Name",
                value: "PAGADO");

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 9, "CANCELADO" });
        }
    }
}
