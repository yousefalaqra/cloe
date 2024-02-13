using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BeHealth.Presentence.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    clientId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(maxLength: 300, nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 15, nullable: true),
                    Gender = table.Column<int>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    isActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Governorates",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Governorate_Name_AR = table.Column<string>(maxLength: 10, nullable: true),
                    Governorate_Name_EN = table.Column<string>(maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Governorates", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    OrganizationId = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    PreparationTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionEntity",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Period = table.Column<int>(nullable: false),
                    PeriodsType = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionEntity", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(maxLength: 16, nullable: true),
                    TypeCategory = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Units",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(maxLength: 15, nullable: true),
                    GramsRatio = table.Column<double>(nullable: false),
                    IsLiquid = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Units", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(maxLength: 300, nullable: true),
                    EmailAddress = table.Column<string>(maxLength: 400, nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 15, nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ClientMeasurements",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Height = table.Column<double>(nullable: false),
                    Date = table.Column<DateTimeOffset>(nullable: false),
                    Wight = table.Column<double>(nullable: false),
                    TotalBodyWater = table.Column<double>(nullable: false),
                    Protien = table.Column<double>(nullable: false),
                    Minerals = table.Column<double>(nullable: false),
                    BodyFatMass = table.Column<double>(nullable: false),
                    skeletalMuscleMass = table.Column<double>(nullable: false),
                    BodyMassIndex = table.Column<double>(nullable: false),
                    FatOfRightArm = table.Column<double>(nullable: false),
                    FatOfLeftArm = table.Column<double>(nullable: false),
                    FatOfTruck = table.Column<double>(nullable: false),
                    FatOfLeftLeg = table.Column<double>(nullable: false),
                    FatOfRightLeg = table.Column<double>(nullable: false),
                    CaloriesIntake = table.Column<double>(nullable: false),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientMeasurements", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientMeasurements_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientObservations",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ObservationDate = table.Column<DateTime>(nullable: false),
                    Observation = table.Column<string>(nullable: true),
                    Client_ID = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientObservations", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientObservations_Clients_Client_ID",
                        column: x => x.Client_ID,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientsDiseases",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Client_ID = table.Column<long>(nullable: false),
                    Disease_Name = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsDiseases", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientsDiseases_Clients_Client_ID",
                        column: x => x.Client_ID,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientTags",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tag = table.Column<string>(nullable: true),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientTags", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientTags_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClinetsMedications",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Client_ID = table.Column<long>(nullable: false),
                    Medication_Name = table.Column<string>(maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClinetsMedications", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClinetsMedications_Clients_Client_ID",
                        column: x => x.Client_ID,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    Name = table.Column<string>(maxLength: 120, nullable: true),
                    ClientId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Templates_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Workplaces",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    OrganizationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workplaces", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Workplaces_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MealsCategories",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeId = table.Column<long>(nullable: false),
                    Category = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealsCategories", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MealsCategories_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeSteps",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(nullable: true),
                    RecipeId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeSteps", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RecipeSteps_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientsSubscriptions",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubscriptionId = table.Column<long>(nullable: false),
                    ClientId = table.Column<long>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsSubscriptions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientsSubscriptions_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsSubscriptions_SubscriptionEntity_SubscriptionId",
                        column: x => x.SubscriptionId,
                        principalTable: "SubscriptionEntity",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedOn = table.Column<DateTimeOffset>(nullable: true),
                    Name = table.Column<string>(maxLength: 15, nullable: true),
                    Fat = table.Column<double>(nullable: false),
                    Carbohydrates = table.Column<double>(nullable: false),
                    Protein = table.Column<double>(nullable: false),
                    Calories = table.Column<double>(nullable: false),
                    BaseQuantity = table.Column<double>(nullable: false),
                    UnitId = table.Column<long>(nullable: false),
                    Group = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Items_Units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Units",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Plans_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientWorkplaces",
                columns: table => new
                {
                    WorkplaceId = table.Column<long>(nullable: false),
                    ClientId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientWorkplaces", x => new { x.ClientId, x.WorkplaceId });
                    table.ForeignKey(
                        name: "FK_ClientWorkplaces_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientWorkplaces_Workplaces_WorkplaceId",
                        column: x => x.WorkplaceId,
                        principalTable: "Workplaces",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserWorkplaces",
                columns: table => new
                {
                    WorkplaceId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWorkplaces", x => new { x.UserId, x.WorkplaceId });
                    table.ForeignKey(
                        name: "FK_UserWorkplaces_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserWorkplaces_Workplaces_WorkplaceId",
                        column: x => x.WorkplaceId,
                        principalTable: "Workplaces",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientSubscriptionPayments",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<double>(nullable: false),
                    Currency = table.Column<int>(nullable: false),
                    PaymentDate = table.Column<DateTime>(nullable: false),
                    ClientsSubscriptionsEntityId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientSubscriptionPayments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClientSubscriptionPayments_ClientsSubscriptions_ClientsSubscriptionsEntityId",
                        column: x => x.ClientsSubscriptionsEntityId,
                        principalTable: "ClientsSubscriptions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeIngredients",
                columns: table => new
                {
                    FoodItemId = table.Column<long>(nullable: false),
                    RecipeId = table.Column<long>(nullable: false),
                    ID = table.Column<long>(nullable: false),
                    Quantity = table.Column<double>(nullable: false),
                    UnitId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredients", x => new { x.RecipeId, x.FoodItemId });
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Items_FoodItemId",
                        column: x => x.FoodItemId,
                        principalTable: "Items",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<int>(nullable: false),
                    PlanId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Days_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                columns: table => new
                {
                    ID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Time = table.Column<DateTimeOffset>(nullable: false),
                    PlanId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Meals_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MealItems",
                columns: table => new
                {
                    MealId = table.Column<long>(nullable: false),
                    ItemId = table.Column<long>(nullable: false),
                    ID = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Quantity = table.Column<double>(nullable: false),
                    UnitId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealItems", x => new { x.ItemId, x.MealId });
                    table.ForeignKey(
                        name: "FK_MealItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealItems_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MealRecipes",
                columns: table => new
                {
                    MealId = table.Column<long>(nullable: false),
                    RecipeId = table.Column<long>(nullable: false),
                    ID = table.Column<long>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealRecipes", x => new { x.RecipeId, x.MealId });
                    table.ForeignKey(
                        name: "FK_MealRecipes_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealRecipes_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Governorates",
                columns: new[] { "ID", "Governorate_Name_AR", "Governorate_Name_EN" },
                values: new object[] { 1L, "سلفيت", "Salfeet" });

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "ID", "CreatedAt", "CreatedBy", "Email", "OrganizationId", "Title", "UpdatedBy", "UpdatedOn" },
                values: new object[] { 1L, new DateTimeOffset(new DateTime(2021, 8, 3, 15, 37, 53, 901, DateTimeKind.Unspecified).AddTicks(3452), new TimeSpan(0, 3, 0, 0, 0)), "SYSTEM", "test@bhealth.com", "122323", "BeHealth", null, null });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "ID", "Type", "TypeCategory" },
                values: new object[,]
                {
                    { 12L, "Fat", 0 },
                    { 11L, "Protein", 0 },
                    { 10L, "Dairy", 0 },
                    { 9L, "Starchy", 0 },
                    { 7L, "Fruit", 0 },
                    { 6L, "Legumes", 0 },
                    { 8L, "Grain", 0 },
                    { 4L, "Snack", 1 },
                    { 3L, "Dinner", 1 },
                    { 2L, "Lunch", 1 },
                    { 1L, "Breakfast", 1 },
                    { 5L, "Vegetables", 0 }
                });

            migrationBuilder.InsertData(
                table: "Units",
                columns: new[] { "ID", "Code", "GramsRatio", "IsLiquid" },
                values: new object[,]
                {
                    { 5L, "اوز", 30.0, false },
                    { 1L, "جرام", 1.0, false },
                    { 2L, "مللتر", 1.0, true },
                    { 3L, "كوب", 250.0, true },
                    { 4L, "ملعقة", 15.0, false },
                    { 6L, "قطعة", 1.0, false }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "BirthDate", "CreatedAt", "CreatedBy", "EmailAddress", "FullName", "PasswordHash", "PasswordSalt", "PhoneNumber", "UpdatedBy", "UpdatedOn", "UserId" },
                values: new object[] { 1L, new DateTime(1993, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTimeOffset(new DateTime(2021, 8, 3, 15, 37, 53, 907, DateTimeKind.Unspecified).AddTicks(8999), new TimeSpan(0, 3, 0, 0, 0)), "SYSTEM", "ameerah@gmail.com", "Ameerah Karakrah", null, null, "+970595675811", null, null, "12222345" });

            migrationBuilder.InsertData(
                table: "Workplaces",
                columns: new[] { "ID", "CreatedAt", "CreatedBy", "OrganizationId", "Title", "UpdatedBy", "UpdatedOn" },
                values: new object[] { 1L, new DateTimeOffset(new DateTime(2021, 8, 3, 15, 37, 53, 907, DateTimeKind.Unspecified).AddTicks(2548), new TimeSpan(0, 3, 0, 0, 0)), "SYSTEM", 1L, "Ramallah - Clinic", null, null });

            migrationBuilder.InsertData(
                table: "Workplaces",
                columns: new[] { "ID", "CreatedAt", "CreatedBy", "OrganizationId", "Title", "UpdatedBy", "UpdatedOn" },
                values: new object[] { 2L, new DateTimeOffset(new DateTime(2021, 8, 3, 15, 37, 53, 907, DateTimeKind.Unspecified).AddTicks(4014), new TimeSpan(0, 3, 0, 0, 0)), "SYSTEM", 1L, "Biddya - Clinic", null, null });

            migrationBuilder.InsertData(
                table: "UserWorkplaces",
                columns: new[] { "UserId", "WorkplaceId", "Role" },
                values: new object[] { 1L, 1L, 0 });

            migrationBuilder.InsertData(
                table: "UserWorkplaces",
                columns: new[] { "UserId", "WorkplaceId", "Role" },
                values: new object[] { 1L, 2L, 0 });

            migrationBuilder.CreateIndex(
                name: "IX_ClientMeasurements_ClientId",
                table: "ClientMeasurements",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientObservations_Client_ID",
                table: "ClientObservations",
                column: "Client_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_PhoneNumber",
                table: "Clients",
                column: "PhoneNumber",
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Clients_clientId",
                table: "Clients",
                column: "clientId",
                unique: true,
                filter: "[clientId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsDiseases_Client_ID",
                table: "ClientsDiseases",
                column: "Client_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsSubscriptions_SubscriptionId",
                table: "ClientsSubscriptions",
                column: "SubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsSubscriptions_ClientId_SubscriptionId",
                table: "ClientsSubscriptions",
                columns: new[] { "ClientId", "SubscriptionId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientSubscriptionPayments_ClientsSubscriptionsEntityId",
                table: "ClientSubscriptionPayments",
                column: "ClientsSubscriptionsEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientTags_ClientId",
                table: "ClientTags",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientWorkplaces_WorkplaceId",
                table: "ClientWorkplaces",
                column: "WorkplaceId");

            migrationBuilder.CreateIndex(
                name: "IX_ClinetsMedications_Client_ID",
                table: "ClinetsMedications",
                column: "Client_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Days_PlanId",
                table: "Days",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_Name",
                table: "Items",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UnitId",
                table: "Items",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_MealItems_MealId",
                table: "MealItems",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_MealRecipes_MealId",
                table: "MealRecipes",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_PlanId",
                table: "Meals",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_MealsCategories_RecipeId",
                table: "MealsCategories",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_TemplateId",
                table: "Plans",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_FoodItemId",
                table: "RecipeIngredients",
                column: "FoodItemId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeSteps_RecipeId",
                table: "RecipeSteps",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Templates_ClientId",
                table: "Templates",
                column: "ClientId",
                unique: true,
                filter: "[ClientId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Types_Type",
                table: "Types",
                column: "Type",
                unique: true,
                filter: "[Type] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Units_Code",
                table: "Units",
                column: "Code",
                unique: true,
                filter: "[Code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserWorkplaces_WorkplaceId",
                table: "UserWorkplaces",
                column: "WorkplaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Workplaces_OrganizationId",
                table: "Workplaces",
                column: "OrganizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientMeasurements");

            migrationBuilder.DropTable(
                name: "ClientObservations");

            migrationBuilder.DropTable(
                name: "ClientsDiseases");

            migrationBuilder.DropTable(
                name: "ClientSubscriptionPayments");

            migrationBuilder.DropTable(
                name: "ClientTags");

            migrationBuilder.DropTable(
                name: "ClientWorkplaces");

            migrationBuilder.DropTable(
                name: "ClinetsMedications");

            migrationBuilder.DropTable(
                name: "Days");

            migrationBuilder.DropTable(
                name: "Governorates");

            migrationBuilder.DropTable(
                name: "MealItems");

            migrationBuilder.DropTable(
                name: "MealRecipes");

            migrationBuilder.DropTable(
                name: "MealsCategories");

            migrationBuilder.DropTable(
                name: "RecipeIngredients");

            migrationBuilder.DropTable(
                name: "RecipeSteps");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropTable(
                name: "UserWorkplaces");

            migrationBuilder.DropTable(
                name: "ClientsSubscriptions");

            migrationBuilder.DropTable(
                name: "Meals");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Workplaces");

            migrationBuilder.DropTable(
                name: "SubscriptionEntity");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Units");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
