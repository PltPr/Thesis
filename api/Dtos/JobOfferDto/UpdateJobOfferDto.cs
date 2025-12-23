using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.JobOfferDto
{
    public class UpdateJobOfferDto
    {
         public string JobTitle { get; set; }
        public string JobType { get; set; }
        public int Salary { get; set; }
        public string ProgrammingLanguage { get; set; }
        public string? Description { get; set; }
    }
}