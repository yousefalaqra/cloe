using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class ClientSubscriptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptions_Clients_ClientId",
                table: "ClientsSubscriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptions_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientSubscriptionPayments_ClientsSubscriptions_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientsSubscriptions",
                table: "ClientsSubscriptions");

            migrationBuilder.RenameTable(
                name: "ClientsSubscriptions",
                newName: "ClientsSubscriptionsEntity");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsSubscriptions_ClientId_SubscriptionId",
                table: "ClientsSubscriptionsEntity",
                newName: "IX_ClientsSubscriptionsEntity_ClientId_SubscriptionId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsSubscriptions_SubscriptionId",
                table: "ClientsSubscriptionsEntity",
                newName: "IX_ClientsSubscriptionsEntity_SubscriptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientsSubscriptionsEntity",
                table: "ClientsSubscriptionsEntity",
                column: "ID");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptionsEntity_Clients_ClientId",
                table: "ClientsSubscriptionsEntity",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptionsEntity_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptionsEntity",
                column: "SubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientSubscriptionPayments_ClientsSubscriptionsEntity_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments",
                column: "ClientsSubscriptionsEntityId",
                principalTable: "ClientsSubscriptionsEntity",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptionsEntity_Clients_ClientId",
                table: "ClientsSubscriptionsEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientsSubscriptionsEntity_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptionsEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientSubscriptionPayments_ClientsSubscriptionsEntity_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClientsSubscriptionsEntity",
                table: "ClientsSubscriptionsEntity");

            migrationBuilder.RenameTable(
                name: "ClientsSubscriptionsEntity",
                newName: "ClientsSubscriptions");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsSubscriptionsEntity_ClientId_SubscriptionId",
                table: "ClientsSubscriptions",
                newName: "IX_ClientsSubscriptions_ClientId_SubscriptionId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientsSubscriptionsEntity_SubscriptionId",
                table: "ClientsSubscriptions",
                newName: "IX_ClientsSubscriptions_SubscriptionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClientsSubscriptions",
                table: "ClientsSubscriptions",
                column: "ID");

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

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptions_Clients_ClientId",
                table: "ClientsSubscriptions",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientsSubscriptions_Subscriptions_SubscriptionId",
                table: "ClientsSubscriptions",
                column: "SubscriptionId",
                principalTable: "Subscriptions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientSubscriptionPayments_ClientsSubscriptions_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments",
                column: "ClientsSubscriptionsEntityId",
                principalTable: "ClientsSubscriptions",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
