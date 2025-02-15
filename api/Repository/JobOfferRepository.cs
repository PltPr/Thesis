using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Mappers;
using api.Models;
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
        public async Task<List<JobOffer>> GetAllAsync()
        {
            var offers= await _context.JobOffer
                .Include(o => o.JobOfferTechnology)  
                .ThenInclude(jot => jot.Technology).ToListAsync();


            return offers;
        }

        public async Task<List<Technology>> GetAllTechnologiesAsync()
        {
            var result = await _context.Technology.ToListAsync();
            
            return result;
        }

        public async Task<List<Technology>> GetTechnologiesForOffer(int id)
        {
            
            var offer = await _context.JobOffer
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