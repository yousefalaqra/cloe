using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class AppointmentEntityEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Appointments_ClientId",
                table: "Appointments");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 14, 48, 56, 565, DateTimeKind.Unspecified).AddTicks(6515), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 14, 48, 56, 573, DateTimeKind.Unspecified).AddTicks(1997), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 14, 48, 56, 572, DateTimeKind.Unspecified).AddTicks(3730), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 14, 48, 56, 572, DateTimeKind.Unspecified).AddTicks(5570), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_ClientId",
                table: "Appointments",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Appointments_ClientId",
                table: "Appointments");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 13, 37, 9, 927, DateTimeKind.Unspecified).AddTicks(4612), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 13, 37, 9, 931, DateTimeKind.Unspecified).AddTicks(8121), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 13, 37, 9, 931, DateTimeKind.Unspecified).AddTicks(3322), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 6, 13, 37, 9, 931, DateTimeKind.Unspecified).AddTicks(4461), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_ClientId",
                table: "Appointments",
                column: "ClientId",
                unique: true);
        }
    }
}
