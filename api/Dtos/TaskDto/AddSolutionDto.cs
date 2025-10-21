using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TaskDto
{
    public class AddSolutionDto
    {
        public int ApplicationId { get; set; }
        public int TaskId { get; set; }
        public string Code { get; set; }
    }
}