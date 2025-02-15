using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Technology;
using api.Models;

namespace api.Dtos.JobOffer
{
    public class JobOfferDto
    {
        public int Id { get; set; }
        public string JobTitle { get; set; }
        public string JobType { get; set; }
        public int Salary { get; set; }
        public string ProgrammingLanguage { get; set; }
        public string? Description { get; set; }

        public List<TechnologyDto> JobOfferTechnology { get; set; } = new List<TechnologyDto>();
    }
}