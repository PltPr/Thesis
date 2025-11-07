using System;
using System.Collections.Generic;
using System.Linq;
using api.Dtos.TaskDto;
using api.Models;

namespace api.Mappers
{
    public static class TaskMappers
    {
        public static TaskDto toTaskDto(this TaskItem model)
        {
            return new TaskDto
            {
                Id = model.Id,
                Description = model.Description,
                ExpectedOutput = model.ExpectedOutput,
                DurationMinutes=model.DurationMinutes
            };
        }

        public static TaskItem toTaskItem(this CreateTaskDto model)
        {
            return new TaskItem
            {
                Description = model.Description,
                ExpectedOutput = model.ExpectedOutput,
                DurationMinutes = model.DurationMinutes
            };
        }
        public static CodeSubmission toCodeSubmission(this AddSolutionDto dto)
        {
            return new CodeSubmission
            {
                ApplicationId = dto.ApplicationId,
                TaskId = dto.TaskId,
                Code = dto.Code,
                SubmissionDate = DateTime.Now
            };
        }
        public static TasksForSolvingDto toTaskForSolvingDto(this TaskItem model, bool isSolved)
        {
            return new TasksForSolvingDto
            {
                Id = model.Id,
                Description = model.Description,
                ExpectedOutput = model.ExpectedOutput,
                DurationMinutes = model.DurationMinutes,
                isSolved = isSolved
            };
        }
        public static TaskWithSolutionDto toTaskWithSolutionDto(this TaskItem task, CodeSubmission codeSubmission)
        {
            return new TaskWithSolutionDto
            {
                CodeSubmissionId = codeSubmission.Id,
                TaskDescription = task.Description,
                TaskExpectedOutput = task.ExpectedOutput,
                Code = codeSubmission.Code,
                SubmissionDate = codeSubmission.SubmissionDate,
                CompilationResult = codeSubmission.CompilationResult,
                ExecutionResult = codeSubmission.ExecutionResult
            };
        }
    }
}