using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.JobOfferDto
{
    public class AddJobOfferDto
    {
        [Required(ErrorMessage ="Job title is required!")]
        public string JobTitle { get; set; }=string.Empty;
        [Required(ErrorMessage ="Job type is required!")]
        public string JobType { get; set; }=string.Empty;
        [Required(ErrorMessage ="Salary is required!")]
        public int Salary { get; set; }
        [Required(ErrorMessage ="Programming language is required!")]
        public string ProgrammingLanguage { get; set; }=string.Empty;
        public string? Description { get; set; }
        public ICollection<string> TechnologyNamesRequired{get;set;}=new List<string>();
        public ICollection<string> TechnologyNamesNiceToHave{get;set;}=new List<string>();
    }
}