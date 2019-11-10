using JUDI.Server.Ladder.Business;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace JUDI.API.Ladder
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
			services.AddDbContextPool<LadderDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("LadderDatabase")));

			services.AddScoped<SkillRepository>();
			services.AddScoped<ClaimRepository>();
			services.AddScoped<EndorsementRepository>();
			services.AddScoped<LevelRepository>();

			services.AddScoped<EmailManager>();
			services.AddScoped<EndorsementManager>();
			services.AddScoped<UserManager>();
			services.AddScoped<ClaimManager>();

			var emailConfiguration = new EmailConfiguration();
			Configuration.Bind("Email", emailConfiguration);
			services.AddSingleton(emailConfiguration);

			var applicationConfiguration = new ApplicationConfiguration();
			Configuration.Bind("Application", applicationConfiguration);
			services.AddSingleton(applicationConfiguration);
		}

		public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}

			app.UseCors(builder => { builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod(); });
			app.UseHttpsRedirection();
			app.UseRouting();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
