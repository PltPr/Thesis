using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.CompilerDto;
using api.Interfaces;
using Microsoft.CodeAnalysis.CodeFixes;
using Microsoft.OpenApi.Writers;

namespace api.Extensions
{
    public class CodeExecutionWorker : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IBackgroundTaskQueue _queue;
        public CodeExecutionWorker(IServiceScopeFactory scopeFactory, IBackgroundTaskQueue queue)
        {
            _scopeFactory=scopeFactory;
            _queue=queue;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                while(!stoppingToken.IsCancellationRequested)
                {
                    var submissionId = await _queue.DequeueAsync(stoppingToken);

                    using var scope = _scopeFactory.CreateScope();
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
                    var compiler = scope.ServiceProvider.GetRequiredService<ICompillerRepository>();

                    var submission = await context.CodeSubmissions.FindAsync(submissionId);
                    if(submission==null)
                        continue;

                    try
                    {
                        var result = await compiler.CompileAsync(new CompileRequest
                        {
                            Code=submission.Code,
                            Language=submission.Language
                        });

                        submission.ExecutionResult = result.Output;
                    }
                    catch(Exception ex)
                    {
                        submission.ExecutionResult=$"Internal error: {ex.Message}";
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (OperationCanceledException)
            {
            }
        }
    }
}