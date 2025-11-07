using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TaskDto
{
    public class TasksForSolvingDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string ExpectedOutput { get; set; }
        public int DurationMinutes { get; set; }
        public bool isSolved { get; set; }
    }
}