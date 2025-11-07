using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.TaskDto;
using api.Interfaces;
using api.Mappers;
using api.Migrations;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class TaskRepository :ITaskRepository
    {
        private readonly ApplicationDBContext _context;
        public TaskRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<CodeSubmission> AddSolutionForTaskAsync(CodeSubmission model)
        {
            await _context.CodeSubmissions.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<TaskItem> AddTaskAsync(TaskItem taskModel)
        {
            await _context.TaskItems.AddAsync(taskModel);
            await _context.SaveChangesAsync();
            return taskModel;
        }

        public async Task<List<TaskItem>> GetAllAsync()
        {
            var tasks = await _context.TaskItems.ToListAsync();
            if (tasks == null)
                return null;

            return tasks;
        }

        public async Task<List<TasksForSolvingDto>?> GetAllTasksForSolvingAsync(int appId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;
            var testId = app.TestId;
            if (testId == null)
                return null;
            var testTasks = await _context.TestTasks.Where(x => x.TestId == testId).Select(x => x.TaskId).ToListAsync();
            var tasksList = await _context.TaskItems.Where(x => testTasks.Contains(x.Id)).ToListAsync();

            var solvedTaskIds = await _context.CodeSubmissions.Where(x => x.ApplicationId == appId && !String.IsNullOrWhiteSpace(x.Code)).Select(x => x.TaskId).ToListAsync();
            var tasksDto = tasksList.Select(x => x.toTaskForSolvingDto(solvedTaskIds.Contains(x.Id))).ToList();
            return tasksDto;
        }

        public async Task<List<TaskItem>?> GetAllTasksForTestAsync(int testId)
        {
            var test = await _context.Tests.FirstOrDefaultAsync(x => x.Id == testId);
            if (test == null)
                return null;

            var taskListIds = await _context.TestTasks.Where(x => x.TestId == testId).Select(x => x.TaskId).ToListAsync();
            var taskList = await _context.TaskItems.Where(x => taskListIds.Contains(x.Id)).ToListAsync();

            return taskList;
        }

        public async Task<TaskItem> GetByIdAsync(int id)
        {
            var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
                return null;
            return task;
        }

        public async Task<List<TaskWithSolutionDto>?> GetCodeSubmissionForAllTask(int appId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;
            var testId = app.TestId;
            if (testId == null)
                return null;

            var tasks = await _context.TestTasks.Include(x => x.Task).Where(x => x.TestId == testId).ToListAsync();

            if (!tasks.Any())
                return new List<TaskWithSolutionDto>();

            var codeSubmission = await _context.CodeSubmissions.Where(x => x.ApplicationId == appId).ToListAsync();
            

            var result = tasks.Select(t =>
            {
                var submission = codeSubmission.FirstOrDefault(x => x.TaskId == t.TaskId) ?? new CodeSubmission();
                return t.Task.toTaskWithSolutionDto(submission);
            }).ToList();

            return result;
        }

        public async Task<TaskWithSolutionDto?> GetCodeSubmissionForTask(int appId, int taskId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;
            var task = await _context.TaskItems.FirstOrDefaultAsync(x => x.Id == taskId);
            if (task == null)
                return null;

            var codeSubmission = await _context.CodeSubmissions.Where(x => x.ApplicationId == appId && x.TaskId == taskId).FirstOrDefaultAsync();
            if (codeSubmission == null)
                return null;

            var result = task.toTaskWithSolutionDto(codeSubmission);
            return result;
        }
    }
}