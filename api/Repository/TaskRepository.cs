using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.TaskDto;
using api.Interfaces;
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

        public async Task<TaskItem> GetByIdAsync(int id)
        {
            var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
                return null;
            return task;
        }
    }
}