using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.JobOfferDto;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IJobOfferRepository
    {
        Task<List<JobOffer>> GetAllAsync(JobOfferQueryObject query);
        Task<List<Technology>> GetRequiredTechnologiesForOffer(int id);
        Task<List<Technology>> GetAllTechnologiesAsync();
        Task<JobOffer> AddJobOfferAsync(AddJobOfferDto jobOfferDto);
        Task<JobOffer> GetById(int id);
        Task<List<string>>GetJobOffersTitlesAsync();
    }
}