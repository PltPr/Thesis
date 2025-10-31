using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CodeSubmission
    {
        public int Id { get; set; }
        public string? Code { get; set; } 
        public DateTime SubmissionDate { get; set; }
        public string? CompilationResult { get; set; }
        public string? ExecutionResult { get; set; }
        public int Evaluation { get; set; }
        public int ApplicationId { get; set; }
        public Application Application { get; set; }
        public int TaskId { get; set; }
        public TaskItem Task { get; set; }
    }
}