using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TaskDto
{
    public class CreateTaskDto
    {
        public string Description { get; set; }
        public string ExpectedOutput { get; set; }
    }
}