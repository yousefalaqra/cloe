using BeHealth.Presentence.Configuration;
using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Entities.Appointments;
using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.FoodManamgnet.Recipes;
using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Locations;
using BeHealth.Presentence.Entities.Meals;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Entities.Subscription;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence
{
    public class BeHealthDBContext : DbContext
    {
        public BeHealthDBContext(DbContextOptions<BeHealthDBContext> options) : base(options) { }


        #region Organization dbsets
        public DbSet<OrganizationEntity> Organizations { get; set; }

        public DbSet<WorkPlaceEntity> Workplaces { get; set; }

        public DbSet<UserEntity> Users { get; set; }

        public DbSet<UserWorkplaceEntity> UserWorkplaces { get; set; }

        public DbSet<ClientEntity> Clients { get; set; }
        public DbSet<AppointmentEntity> Appointments { get; set; }

        public DbSet<ClientWorkplaceEntity> ClientWorkplaces { get; set; }

        #endregion

        #region Diet module regien
        public DbSet<FoodItemEntity> FoodItems { get; set; }
        public DbSet<TemplateEntity> Templates { get; set; }
        public DbSet<MealEntity> Meals { get; set; }
        public DbSet<MealRecipeEntity> MealRecipes { get; set; }
        public DbSet<MealItemEntity> MealItems { get; set; }
        public DbSet<PlanEntity> Plans { get; set; }
        public DbSet<DayEntity> Days { get; set; }

        public DbSet<TypesEntity> TypeEntites { get; set; }

        public DbSet<UnitEntity> UnitEntites { get; set; }

        public DbSet<RecipeEntity> Recipes { get; set; }
        public DbSet<RecipeStepsEntity> RecipeSteps { get; set; }
        public DbSet<RecipeIngredientEntity> RecipeIngredients { get; set; }
        public DbSet<RecipeCategoriesEntity> RecipeCategories { get; set; }


        //public DbSet<PlanEntity> Plans { get; set; }
        #endregion


        #region Client module regin

        public DbSet<ClientTagsEntity> ClientTags { get; set; }
        public DbSet<ClientsDiseasesEntity> ClientsDiseases { get; set; }
        public DbSet<ClinetsMedicationsEntity> ClinetsMedications { get; set; }
        public DbSet<ClientObservationsEntity> ClientObservations { get; set; }
        public DbSet<ClientMeasurementEntity> ClientMeasurements { get; set; }


        public DbSet<ClientsSubscriptionsEntity> ClientsSubscriptions { get; set; }
        public DbSet<ClientPaymentEntity> ClientSubscriptionPayments { get; set; }
        #endregion


        #region subscriptions region
        public DbSet<SubscriptionEntity> Subscriptions { get; set; }
        public DbSet<ClientsSubscriptionsEntity> ClientSubscriptions { get; set; }
        public DbSet<ClientPaymentEntity> ClientPayments { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new OrganizationConfiguration(modelBuilder.Entity<OrganizationEntity>());
            new WorkplaceConfiguration(modelBuilder.Entity<WorkPlaceEntity>());
            new UserConfiguration(modelBuilder.Entity<UserEntity>());
            new UserWorkplaceConfiguration(modelBuilder.Entity<UserWorkplaceEntity>());
            new ClientWorkplaceConfiguration(modelBuilder.Entity<ClientWorkplaceEntity>());
            new ClientConfiguration(modelBuilder.Entity<ClientEntity>());


            new ItemsConfiguration(modelBuilder.Entity<FoodItemEntity>());
            new TypesConfiguration(modelBuilder.Entity<TypesEntity>());
            new UnitsConfiguration(modelBuilder.Entity<UnitEntity>());

            new GovernorateConfiguration(modelBuilder.Entity<GovernorateEntity>());

            new ClientsSubscriptionsConfiguration(modelBuilder.Entity<ClientsSubscriptionsEntity>());


            new RecipeIngredientsConfiguration(modelBuilder.Entity<RecipeIngredientEntity>());
            new MealRecipeConfiguration(modelBuilder.Entity<MealRecipeEntity>());
            new MealItemConfiguration(modelBuilder.Entity<MealItemEntity>());
        }
    }
}
