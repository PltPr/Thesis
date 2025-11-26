using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;

using api.Dtos.JobOfferDto;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class JobOfferRepository : IJobOfferRepository
    {
        private readonly ApplicationDBContext _context;
        public JobOfferRepository(ApplicationDBContext context)
        {
            _context=context;
        }

        public async Task<JobOffer> AddJobOfferAsync(AddJobOfferDto jobOfferDto)
        {
            if(jobOfferDto.TechnologyNamesRequired==null)
            {throw new ArgumentException("Offer must contains technologies");}


            var requiredTechnologies = await _context.Technologies.Where(t=>jobOfferDto.TechnologyNamesRequired.Contains(t.Name)).ToListAsync();
            var additionalTechnologies = await _context.Technologies.Where(t=>jobOfferDto.TechnologyNamesNiceToHave.Contains(t.Name)).ToListAsync();
            var jobOffer=JobOfferMappers.ToJobOffer(jobOfferDto, requiredTechnologies,additionalTechnologies);

            _context.JobOffers.Add(jobOffer);
            await _context.SaveChangesAsync();
            return jobOffer;
        }

        

        public async Task<List<JobOffer>> GetAllAsync(JobOfferQueryObject query)
        {
            var offers=_context.JobOffers
                .Include(o => o.JobOfferTechnologyRequired)
                .ThenInclude(t => t.Technology)
                .Include(a=>a.JobOfferTechnologyNiceToHave)
                .ThenInclude(t=>t.Technology)
                .AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.JobTitle))
            {
                offers = offers.Where(o=>o.JobTitle.Contains(query.JobTitle));
            }
            if(!string.IsNullOrWhiteSpace(query.Language))
            {
                offers = offers.Where(o=>o.ProgrammingLanguage==query.Language);
            }
            return await offers.ToListAsync();
        }

        public async Task<List<Technology>> GetAllTechnologiesAsync()
        {
            var result = await _context.Technologies.ToListAsync();
            
            return result;
        }

        public async Task<JobOffer> GetById(int id)
        {
            var offer = await _context.JobOffers.FindAsync(id);
            return offer;
        }

        public async Task<List<Technology>> GetRequiredTechnologiesForOffer(int id)
        {
            
            var offer = await _context.JobOffers
                .Include(o => o.JobOfferTechnologyRequired)  
                .ThenInclude(jot => jot.Technology)  
                .FirstOrDefaultAsync(o => o.Id == id);

        
            if (offer == null)
            {
                return null;  
            }

            return offer.JobOfferTechnologyRequired.Select(jot => jot.Technology).ToList();
        }
    }
}