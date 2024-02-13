using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class Dues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Dues",
                table: "Clients",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 18, 25, 5, 445, DateTimeKind.Unspecified).AddTicks(1211), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 18, 25, 5, 449, DateTimeKind.Unspecified).AddTicks(1509), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 18, 25, 5, 448, DateTimeKind.Unspecified).AddTicks(7488), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 18, 25, 5, 448, DateTimeKind.Unspecified).AddTicks(8341), new TimeSpan(0, 3, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dues",
                table: "Clients");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 15, 25, 35, 536, DateTimeKind.Unspecified).AddTicks(5077), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 15, 25, 35, 540, DateTimeKind.Unspecified).AddTicks(5229), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 15, 25, 35, 540, DateTimeKind.Unspecified).AddTicks(1131), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 15, 25, 35, 540, DateTimeKind.Unspecified).AddTicks(2000), new TimeSpan(0, 3, 0, 0, 0)));
        }
    }
}
