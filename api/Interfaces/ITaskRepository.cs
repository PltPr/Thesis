using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TaskDto;
using api.Models;

namespace api.Interfaces
{
    public interface ITaskRepository
    {
        Task<TaskItem> GetByIdAsync(int id);
        Task<List<TaskItem>> GetAllAsync();
        Task<TaskItem> AddTaskAsync(TaskItem taskModel);
    }
}