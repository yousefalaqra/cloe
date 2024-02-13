using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class ClientPaymentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientSubscriptionPayments");

            migrationBuilder.CreateTable(
                name: "ClientPaymentEntity",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(nullable: false),
                    PyamentDate = table.Column<DateTimeOffset>(nullable: false),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientPaymentEntity", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientPaymentEntity_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Organizations",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 19, 26, 45, 209, DateTimeKind.Unspecified).AddTicks(6134), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 19, 26, 45, 213, DateTimeKind.Unspecified).AddTicks(5019), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 19, 26, 45, 213, DateTimeKind.Unspecified).AddTicks(1127), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 19, 26, 45, 213, DateTimeKind.Unspecified).AddTicks(1963), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_ClientPaymentEntity_ClientId",
                table: "ClientPaymentEntity",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientPaymentEntity");

            migrationBuilder.CreateTable(
                name: "ClientSubscriptionPayments",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    ClientsSubscriptionsEntityId = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<int>(type: "int", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientSubscriptionPayments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientSubscriptionPayments_ClientsSubscriptionsEntity_ClientsSubscriptionsEntityId",
                        column: x => x.ClientsSubscriptionsEntityId,
                        principalTable: "ClientsSubscriptionsEntity",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_ClientSubscriptionPayments_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments",
                column: "ClientsSubscriptionsEntityId");
        }
    }
}
