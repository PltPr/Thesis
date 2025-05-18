using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;

using api.Dtos.JobOfferDto;
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
            if(jobOfferDto.TechnologyNames==null)
            {throw new ArgumentException("Offer must contains technologies");}


            var existingTechnologies = await _context.Technologies.Where(t=>jobOfferDto.TechnologyNames.Contains(t.Name)).ToListAsync();
            var jobOffer=JobOfferMappers.ToJobOffer(jobOfferDto, existingTechnologies);

            _context.JobOffers.Add(jobOffer);
            await _context.SaveChangesAsync();
            return jobOffer;
        }

        public async Task<List<JobOffer>> GetAllAsync()
        {
            var offers= await _context.JobOffers
                .Include(o => o.JobOfferTechnology)  
                .ThenInclude(jot => jot.Technology).ToListAsync();


            return offers;
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

        public async Task<List<Technology>> GetTechnologiesForOffer(int id)
        {
            
            var offer = await _context.JobOffers
                .Include(o => o.JobOfferTechnology)  
                .ThenInclude(jot => jot.Technology)  
                .FirstOrDefaultAsync(o => o.Id == id);

        
            if (offer == null)
            {
                return null;  
            }

            return offer.JobOfferTechnology.Select(jot => jot.Technology).ToList();
        }
    }
}