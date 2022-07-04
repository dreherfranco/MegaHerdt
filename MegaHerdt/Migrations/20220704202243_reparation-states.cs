using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationstates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                keyValue: 2,
                column: "Name",
                value: "EN REVISION");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "EN PRESUPUESTO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "EN REPARACION");

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 5, "EN REPARACION" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 6, "FINALIZADO" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 7, "ENTREGADO" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 8, "PAGADO" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 9, "CANCELADO" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 9);

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

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "EN PRESUPUESTO");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "EN REPARACION");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "PREPARADO");
        }
    }
}
