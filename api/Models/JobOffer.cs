using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



namespace api.Models
{
    public class JobOffer
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Job tittle is required!")]
        public string JobTitle { get; set; }=string.Empty;
        [Required(ErrorMessage ="Job type is required!")]
        public string JobType { get; set; }=string.Empty;
        [Required(ErrorMessage ="Salary is required!")]
        public int Salary { get; set; }
        [Required(ErrorMessage ="Programming language is required!")]
        public string ProgrammingLanguage { get; set; }=string.Empty;
        public string? Description { get; set; }
        public bool isVisible { get; set; } = true;

        public ICollection<JobOfferTechnologyRequired> JobOfferTechnologyRequired { get; set; } = new List<JobOfferTechnologyRequired>();
        public ICollection<JobOfferTechnologyNiceToHave> JobOfferTechnologyNiceToHave { get; set; } = new List<JobOfferTechnologyNiceToHave>();
    }
}
