using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TestDto;
using api.Models;

namespace api.Mappers
{
    public static class TestMappers
    {
        public static Test ToTest(this AddTestDto model)
        {
            return new Test
            {
                Description = model.Description
            };
        }

        public static TestDto toDto(this Test model)
        {
            return new TestDto
            {
                Id = model.Id,
                Description = model.Description,
                TaskIds = model.TestTasks.Select(t=>t.TaskId).ToList()
            };
        }
        
    }
}