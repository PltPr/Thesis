using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TaskDto
{
    public class TaskWithSolutionDto
    {
        public int CodeSubmissionId { get; set; }
        public string TaskDescription { get; set; }
        public string TaskExpectedOutput { get; set; }
        public string? Code { get; set; }
        public int? Evaluation { get; set; }
        public DateTime SubmissionDate { get; set; }
        public string? CompilationResult { get; set; }
        public string? ExecutionResult { get; set; }

    }
}