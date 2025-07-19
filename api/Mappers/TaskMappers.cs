using System;
using System.Collections.Generic;
using System.Linq;
using api.Dtos.TaskDto;
using api.Models;

namespace api.Mappers
{
    public static class TaskMappers
    {
        public static TaskDto toDto(this TaskItem model)
        {
            return new TaskDto
            {
                Id = model.Id,
                Description = model.Description,
                ExpectedOutput = model.ExpectedOutput
            };
        }

        public static TaskItem toTaskItem(this CreateTaskDto model)
        {
            return new TaskItem
            {
                Description = model.Description,
                ExpectedOutput = model.ExpectedOutput
            };
        }
    }
}