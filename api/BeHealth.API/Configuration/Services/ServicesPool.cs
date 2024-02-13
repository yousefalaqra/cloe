using AutoMapper;

using BeHealth.API.Configuration.JwtToken;
using BeHealth.Business.Managers;
using BeHealth.Business.Models.Clients;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Meals;
using BeHealth.Business.Models.FoodManamgnet.Nutrition;
using BeHealth.Business.Models.Settings;
using BeHealth.Business.Models.Users;
using BeHealth.Business.Resources.Clinets;
using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using BeHealth.Business.Resources.FoodManamgnet.Meals;
using BeHealth.Business.Resources.FoodManamgnet.Nutrition;
using BeHealth.Business.Resources.Settings;
using BeHealth.Business.Resources.Users;
using BeHealth.Presentence;
using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.FoodManamgnet.Nutrition;
using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Meals;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Respositories;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using StockManagment.Presentence.Repositories;

using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace BeHealth.API.Configuration.Services
{
    public static class ServicesPool
    {

        public static IServiceCollection ConfigureJwtAuthToken(this IServiceCollection services, IConfiguration configuration)
        {

            services
               .AddAuthentication(options =>
               {
                   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
               })
               .AddJwtBearer(jwtOptions =>
               {
                   jwtOptions.RequireHttpsMetadata = false;
                   jwtOptions.SaveToken = true;
                   jwtOptions.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuerSigningKey = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtKey"])),
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateLifetime = true,
                       ClockSkew = TimeSpan.FromMinutes(5)
                   };
               });

            services.AddScoped<IJwtTokenFactory, JwtTokenFactory>();

            return services;
        }

        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Be Health API",
                    Description = "Nutritional and dietary management system ASP.NET Core Web API",
                    TermsOfService = new Uri("http://joaqra.com"),
                    Contact = new OpenApiContact
                    {
                        Name = "Jo Aqra",
                        Email = "yousif.aqra@outlook.com",
                        Url = new Uri("http://joaqra.com"),
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("http://joaqra.com"),
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                    },
                        Array.Empty<string>()
                    }
                });
            });

            return services;
        }


        public static IServiceCollection ConfigureCorsPlicy(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .WithOrigins("http://localhost:4200", "http://behealthameerah.herokuapp.com", "https://behealthameerah.herokuapp.com", "https://bhclient.herokuapp.com/", "http://bhclient.herokuapp.com/")
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            return services;
        }

        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IClientsSubscriptionsRepository, ClientsSubscriptionsRepository>();


            return services;
        }

        public static IServiceCollection ConfigureManagers(this IServiceCollection services)
        {
            services.AddScoped<IClientManager, ClientManager>();
            services.AddScoped<IWrokplaceManager, WorkplaceManager>();
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IItemManager, ItemManager>();
            services.AddScoped<IRecipeManager, RecipeManager>();
            services.AddScoped<IUnitManager, UnitManager>();
            services.AddScoped<ILocationManager, LocationManager>();
            services.AddScoped<ITypeManager, TypeManager>();
            services.AddScoped<ISubscriptionManager, SubscriptionManager>();
            services.AddScoped<ITemplateManager, TemplateManager>();
            services.AddScoped<IAppointmentManager, AppointmentManager>();


            return services;
        }

        public static IServiceCollection AddConnection(this IServiceCollection services, IConfiguration configuration)
        {
            var connection = configuration.GetSection("ConnectionStrings")["BH_TEST"];
            services.AddDbContext<BeHealthDBContext>(options =>
            options.UseSqlServer(connection, b => b.MigrationsAssembly("BeHealth.Presentence")));

            return services;
        }

        public static IServiceCollection ConfigureMapper(this IServiceCollection services)
        {
            var config = new MapperConfiguration(cfg =>
            {
                #region Models Mappings
                cfg.CreateMap<ClientEntity, ClientResource>().ReverseMap();
                cfg.CreateMap<ClientEntity, ClientModel>().ReverseMap();

                cfg.CreateMap<UserResource, UserEntity>().ReverseMap();
                cfg.CreateMap<UserRegistrationModel, UserEntity>().ReverseMap();

                cfg.CreateMap<FoodItemModel, FoodItemEntity>().ReverseMap();
                cfg.CreateMap<FoodItemResource, FoodItemEntity>().ReverseMap();
                cfg.CreateMap<NutritionValueEntity, NutritionValueModel>().ReverseMap();


                cfg.CreateMap<UnitEntity, UnitResource>().ReverseMap();
                cfg.CreateMap<UnitEntity, UnitModel>().ReverseMap();



                cfg.CreateMap<RecipeModel, RecipeEntity>().ReverseMap();
                cfg.CreateMap<RecipeResource, RecipeEntity>().ReverseMap();
                cfg.CreateMap<IngredientModel, RecipeIngredientEntity>().ReverseMap();






                cfg.CreateMap<TypesEntity, TypeResource>().ReverseMap();
                cfg.CreateMap<TypesEntity, TypeModel>().ReverseMap();

                #endregion
            });

            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            return services;
        }

        public static void InitializeDatabase(this IApplicationBuilder app)
        {
            using IServiceScope scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();

            scope.ServiceProvider.GetRequiredService<BeHealthDBContext>().Database.Migrate();
        }
    }
}
