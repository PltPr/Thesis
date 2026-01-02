using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    public static class MigrateDockerExtension
    {
        public static async Task MigrateDatabaseWithRetryAsync(this IServiceProvider services, int maxRetries =6,int delaySeconds = 3)
        {
            var retries = 0;
            while(true)
            {
                try
                {
                    using var scope = services.CreateScope();
                    var context = services.GetRequiredService<ApplicationDBContext>();
                    context.Database.Migrate();
                    DatabaseSeeder.Seed(context);
                    break;
                }
                catch(Exception ex)
                {
                    retries++;
                    if(retries>=maxRetries)
                    {
                        Console.WriteLine($"Migration error: {ex.Message}");
                        throw;
                    }
                    Console.WriteLine($"Database connection retry - {retries}/{maxRetries}");
                    await Task.Delay(delaySeconds*1000);
                }
            }
        }
    }
}