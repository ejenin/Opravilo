using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Opravilo.Migrator;

namespace Opravilo.API.BackgroundServices
{
    public class MigratorService : IHostedService
    {
        private readonly string _connectionString;
        private readonly ILogger<MigratorService> _logger;

        public MigratorService(IConfiguration configuration, ILogger<MigratorService> logger)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("Opravilo");
        }
        
        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting migrations... Connection string: {connectionString}", _connectionString);
            var migrator = new DbMigrator(_connectionString);

            // try
            // {
            migrator.MigrateDb();
            
            // }
            // catch (Exception ex)
            // {
            //     _logger.LogError(ex, "Error running migrations!");
            //     throw;
            // }
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}