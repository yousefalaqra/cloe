using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class ClientSubscriptionsEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "StartDate",
                table: "ClientsSubscriptionsEntity",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "EndDate",
                table: "ClientsSubscriptionsEntity",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<bool>(
                name: "IsCurrent",
                table: "ClientsSubscriptionsEntity",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 17, 47, 352, DateTimeKind.Unspecified).AddTicks(7330), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 17, 47, 360, DateTimeKind.Unspecified).AddTicks(2271), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 17, 47, 359, DateTimeKind.Unspecified).AddTicks(4851), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 17, 47, 359, DateTimeKind.Unspecified).AddTicks(6518), new TimeSpan(0, 3, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCurrent",
                table: "ClientsSubscriptionsEntity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "ClientsSubscriptionsEntity",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTimeOffset));

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "ClientsSubscriptionsEntity",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTimeOffset));

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 10, 24, 13, DateTimeKind.Unspecified).AddTicks(2917), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 10, 24, 20, DateTimeKind.Unspecified).AddTicks(4962), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 10, 24, 19, DateTimeKind.Unspecified).AddTicks(4572), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 21, 10, 24, 19, DateTimeKind.Unspecified).AddTicks(6082), new TimeSpan(0, 3, 0, 0, 0)));
        }
    }
}
