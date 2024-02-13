using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class SubsbscriptionsEntityEdit2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Disabled",
                table: "Subscriptions",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 54, 28, 621, DateTimeKind.Unspecified).AddTicks(2538), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 54, 28, 628, DateTimeKind.Unspecified).AddTicks(3498), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 54, 28, 627, DateTimeKind.Unspecified).AddTicks(6970), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 54, 28, 627, DateTimeKind.Unspecified).AddTicks(8351), new TimeSpan(0, 3, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Disabled",
                table: "Subscriptions");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 43, 14, 430, DateTimeKind.Unspecified).AddTicks(3875), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 43, 14, 436, DateTimeKind.Unspecified).AddTicks(4622), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 43, 14, 435, DateTimeKind.Unspecified).AddTicks(8359), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 17, 43, 14, 435, DateTimeKind.Unspecified).AddTicks(9686), new TimeSpan(0, 3, 0, 0, 0)));
        }
    }
}
