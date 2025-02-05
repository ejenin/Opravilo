using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Opravilo.API.Auth;
using Opravilo.API.Auth.External;
using Opravilo.API.Auth.External.Implementation;
using Opravilo.API.BackgroundServices;
using Opravilo.API.Options;
using Opravilo.Application.Interfaces.Services;
using Opravilo.Application.Services;
using Opravilo.DataAccess.EntityFramework;
using Opravilo.DataAccess.EntityFramework.Repositories;
using Opravilo.DataAccess.Repositories;

namespace Opravilo.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddTransient<IStateRepository, StateRepository>();
            services.AddTransient<ICardRepository, CardRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IProjectService, ProjectService>();
            services.AddHostedService<MigratorService>();

            return services;
        }
        
        public static IServiceCollection AddAuthenticationServices(this IServiceCollection services, JwtAuthOptions authOptions)
        {
            var tokenParametersCreator = new TokenValidationParametersCreator();

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.RequireHttpsMetadata = false;
                    opt.TokenValidationParameters = tokenParametersCreator.Create(authOptions, true);
                });

            services.AddSingleton<ITokenValidationParametersCreator>(tokenParametersCreator);
            services.AddTransient<IVkExternalAuth, VkontakteExternalAuth>();
            services.AddTransient<IExternalAuthProvider, ExternalAuthProvider>();
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IPasswordHasher, PasswordHasher>();
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            return services;
        }

        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Opravilo");
            services.AddDbContext<DataContext>(builder =>
            {
                builder.UseNpgsql(connectionString);
                
                // todo: разобраться с датами
                AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            });
            return services;
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Opravilo.API", Version = "v1" });
                
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Bearer",
                    BearerFormat = "JWT",
                    Scheme = "bearer",
                    Description = "Write 'token' to authenticate",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http
                });
                
                var securityScheme = new OpenApiSecurityScheme()
                {
                    Reference = new OpenApiReference()
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }
                };

                var securityRequirements = new OpenApiSecurityRequirement()
                {
                    { securityScheme, new string[] { } },
                };
                c.AddSecurityRequirement(securityRequirements);
            });
            return services;
        }
    }
}