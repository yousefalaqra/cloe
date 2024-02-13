using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class ClientPaymentEntity2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dues",
                table: "Clients");

            migrationBuilder.CreateTable(
                name: "ClientDueEntity",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(nullable: false),
                    DueDate = table.Column<DateTimeOffset>(nullable: false),
                    Reason = table.Column<string>(nullable: true),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientDueEntity", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientDueEntity_Clients_ClientId",
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
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 20, 40, 5, 827, DateTimeKind.Unspecified).AddTicks(3059), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 20, 40, 5, 831, DateTimeKind.Unspecified).AddTicks(3844), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 1L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 20, 40, 5, 830, DateTimeKind.Unspecified).AddTicks(9786), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Workplaces",
                keyColumn: "ID",
                keyValue: 2L,
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2021, 8, 5, 20, 40, 5, 831, DateTimeKind.Unspecified).AddTicks(666), new TimeSpan(0, 3, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_ClientDueEntity_ClientId",
                table: "ClientDueEntity",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientDueEntity");

            migrationBuilder.AddColumn<double>(
                name: "Dues",
                table: "Clients",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

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
        }
    }
}
