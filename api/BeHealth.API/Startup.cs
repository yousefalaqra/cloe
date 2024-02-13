using AutoWrapper;
using BeHealth.API.Configuration.Services;
using BeHealth.API.Middlewares;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Net;

namespace BeHealth.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();

            Console.WriteLine("+++++++++++++++++++++++++++++++++++++++++++++");
            Console.WriteLine(Configuration);

            services
                .ConfigureJwtAuthToken(Configuration)
                .AddConnection(Configuration)
                .ConfigureCorsPlicy()
                .ConfigureSwagger()
                .ConfigureRepositories()
                .ConfigureManagers()
                .ConfigureMapper();

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseForwardedHeaders();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            else
            {

            }

            app.InitializeDatabase();

            app.UseHttpsRedirection();

            app.UseApiResponseAndExceptionWrapper();

            app.UseDefaultFiles();
            // Serve wwwroot/dist as a root 
            app.UseStaticFiles();


            app.UseRouting();

         

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");

            });

            app.UseMiddleware<ExceptionHandler>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
