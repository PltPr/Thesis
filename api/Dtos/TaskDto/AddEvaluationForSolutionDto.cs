using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TaskDto
{
    public class AddEvaluationForSolutionDto
    {
        public int codeSubmissionId { get; set; }
        public int evaluation { get; set; }
    }
}