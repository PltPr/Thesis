using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.TestDto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TestRepository : ITestRepository
    {
        private readonly ApplicationDBContext _context;
        public TestRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Test> AddTestAsync(AddTestDto dto)
        {
            var existingTaskIds = await _context.TaskItems
                .Where(t => dto.TaskIds.Contains(t.Id))
                .Select(t => t.Id)
                .ToListAsync();

            var missingIds = dto.TaskIds.Except(existingTaskIds).ToList();

            if (missingIds.Any())
                throw new Exception($"TaskIds not found: {string.Join(",", missingIds)} ");



            var test = dto.ToTest();

            test.TestTasks = existingTaskIds.Select(t => new TestTask
            {
                TaskId = t
            }).ToList();

            await _context.Tests.AddAsync(test);
            await _context.SaveChangesAsync();

            return test;
        }

        public async Task<Test?> FinishTestAsync(int appId)
        {
            var app = await _context.Applications.Include(x=>x.Test).FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;
            var test = app.Test;
            if (test == null)
                return null;

            app.Status = "Test completed";
            app.TestEndTime = DateTime.Now;

            await _context.SaveChangesAsync();

            return test;
        }

        public async Task<List<Test>> GetAllAsync()
        {
            var response = await _context.Tests.Include(t=>t.TestTasks).ThenInclude(x=>x.Task).ToListAsync();
            return response;
        }

        public async Task<Test?> GetByIdAsync(int id)
        {
            var test = await _context.Tests.Include(t=>t.TestTasks).ThenInclude(t=>t.Task).FirstOrDefaultAsync(t=>t.Id==id);
            if (test == null)
                return null;

            return test;
        }

        public async Task<double> GetOverallTestRatingAsync(int appId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x=>x.Id==appId);
            if(app==null)
                throw new Exception ("Cannot find an application");
            
            var testId=app.TestId;
            if(testId==null)
                throw new Exception("No test assigned to this application");
            
            var tasksIds = await _context.TestTasks.Where(x=>x.TestId==testId).Select(x=>x.TaskId).ToListAsync();
            if(tasksIds.Count==0)
                throw new Exception("Test has no tasks");
            
            var evaluations = await _context.CodeSubmissions.Where(x=>x.ApplicationId==appId && tasksIds.Contains(x.TaskId)).Select(x=>x.Evaluation).ToListAsync();
            if(evaluations.Count==0)
                return 0;
            
            var validEvaluations = evaluations.Where(x=>x.HasValue).Select(x=>x.Value).ToList();
            
            double sum = validEvaluations.Sum(x=>x);

            return Math.Round(sum/tasksIds.Count,1);
        }

        public async Task<Test?> GetTestForAppAsync(int appId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x => x.Id == appId);
            
            if (app == null||app.TestId==null)
                return null;

            var test = await _context.Tests.Include(x=>x.TestTasks).ThenInclude(x=>x.Task).FirstOrDefaultAsync(x => x.Id == app.TestId);
            if (test == null)
                return null;

            return test;
        }

        public async Task<Test?> StartTestAsync(int appId)
        {
            var app = await _context.Applications.Include(x=>x.Test).FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;
            var test = app.Test;
            if (test == null)
                return null;

            app.Status = "Test started";
            app.TestStartTime = DateTime.Now;

            await _context.SaveChangesAsync();

            return test;
        }
    }
}