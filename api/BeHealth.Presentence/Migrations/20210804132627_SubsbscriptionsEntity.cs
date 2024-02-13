using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class SubsbscriptionsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptions_SubscriptionEntity_SubscriptionId",
                table: "ClientsSubscriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubscriptionEntity",
                table: "SubscriptionEntity");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "SubscriptionEntity");

            migrationBuilder.RenameTable(
                name: "SubscriptionEntity",
                newName: "Subscriptions");

            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "Subscriptions",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subscriptions",
                table: "Subscriptions",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 16, 26, 26, 838, DateTimeKind.Unspecified).AddTicks(4844), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 16, 26, 26, 844, DateTimeKind.Unspecified).AddTicks(7936), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 16, 26, 26, 844, DateTimeKind.Unspecified).AddTicks(1480), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 16, 26, 26, 844, DateTimeKind.Unspecified).AddTicks(2802), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptions_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptions",
                column: "SubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptions_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subscriptions",
                table: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "Subscriptions");

            migrationBuilder.RenameTable(
                name: "Subscriptions",
                newName: "SubscriptionEntity");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "SubscriptionEntity",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubscriptionEntity",
                table: "SubscriptionEntity",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 1, 6, 11, 47, DateTimeKind.Unspecified).AddTicks(4795), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 1, 6, 11, 56, DateTimeKind.Unspecified).AddTicks(6413), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 1, 6, 11, 55, DateTimeKind.Unspecified).AddTicks(3652), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 4, 1, 6, 11, 55, DateTimeKind.Unspecified).AddTicks(6106), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptions_SubscriptionEntity_SubscriptionId",
                table: "ClientsSubscriptions",
                column: "SubscriptionId",
                principalTable: "SubscriptionEntity",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
