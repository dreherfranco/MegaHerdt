using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MegaHerdt.API.Migrations
{
    public partial class reparationstatesseeddate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "b5411293-e842-44f8-9051-0aaeab3691ee");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "2769be20-cd4d-466f-b733-44ab31a0777e");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "INGRESO");

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "EN PRESUPUESTO" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "EN REPARACION" });

            migrationBuilder.InsertData(
                table: "ReparationsStates",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "PREPARADO" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845d",
                column: "ConcurrencyStamp",
                value: "1e4bfb38-0c5a-432d-bf1f-d21685f9664e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9aae0b6d-d50c-4d0a-9b90-2a6873e3845e",
                column: "ConcurrencyStamp",
                value: "53abb925-ec59-4105-8e32-11447c1f7b5c");

            migrationBuilder.UpdateData(
                table: "ReparationsStates",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "En proceso");
        }
    }
}
