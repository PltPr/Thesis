using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.JobOffer;
using api.Dtos.Technology;

namespace api.Mappers
{
    public static class JobOfferMappers
    {
        public static JobOfferDto ToJobOfferDto(this JobOffer model)
        {
            return new JobOfferDto{
                Id=model.Id,
                JobTitle=model.JobTitle,
                JobType=model.JobType,
                Salary=model.Salary,
                ProgrammingLanguage=model.ProgrammingLanguage,
                Description=model.Description,
                JobOfferTechnology = model.JobOfferTechnology
                .Select(jot => jot.Technology.asDto()).ToList()
                
            };
        }
    }
}