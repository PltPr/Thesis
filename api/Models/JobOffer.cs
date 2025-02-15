using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



namespace api.Models
{
    public class JobOffer
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public string JobType { get; set; }
        public int Salary { get; set; }
        public string ProgrammingLanguage { get; set; }
        public string? Description { get; set; }

        public List<JobOfferTechnology> JobOfferTechnology { get; set; } = new List<JobOfferTechnology>();
    }
}
