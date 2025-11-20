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
        Task<List<TaskItem>?> GetAllTasksForTestAsync(int testId);
        Task<List<TasksForSolvingDto>?> GetAllTasksForSolvingAsync(int appId);
        Task<CodeSubmission> AddSolutionForTaskAsync(CodeSubmission model);
        Task<TaskWithSolutionDto?> GetCodeSubmissionForTask(int appId, int taskId);
        Task<List<TaskWithSolutionDto>?> GetCodeSubmissionForAllTask(int appId);
        Task<CodeSubmission?> AddEvaluationForSolutionAsync(AddEvaluationForSolutionDto dto);
        Task<bool>isTestEvaluated(int codeSubmissionId);
    }
}