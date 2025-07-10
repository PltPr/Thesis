using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.JobOfferDto;
using api.Dtos.Technology;

namespace api.Mappers
{
    public static class JobOfferMappers
    {
        public static JobOfferDto ToJobOfferDto(this JobOffer model)
        {
            return new JobOfferDto
            {
                Id = model.Id,
                JobTitle = model.JobTitle,
                JobType = model.JobType,
                Salary = model.Salary,
                ProgrammingLanguage = model.ProgrammingLanguage,
                Description = model.Description,
                JobOfferTechnologyRequired = model.JobOfferTechnologyRequired
                .Select(t => t.Technology.asDto()).ToList(),
                JobOfferTechnologyNiceToHave = model.JobOfferTechnologyNiceToHave
                .Select(t=>t.Technology.asDto()).ToList()
                
            };
        }

        public static JobOffer ToJobOffer(AddJobOfferDto model, List<Technology> technologiesRequired, List<Technology>technologiesAdditional)
        {
            return new JobOffer
            {
                JobTitle = model.JobTitle,
                JobType = model.JobType,
                Salary = model.Salary,
                ProgrammingLanguage = model.ProgrammingLanguage,
                Description = model.Description,
                JobOfferTechnologyRequired = technologiesRequired.Select(t => new JobOfferTechnologyRequired
                {
                    TechnologyIdRequired = t.Id
                }).ToList(),
                JobOfferTechnologyNiceToHave = technologiesAdditional.Select(t=>new JobOfferTechnologyNiceToHave
                {
                    TechnologyIdNiceToHave =t.Id
                }).ToList()
                
            };
        }
    }
}