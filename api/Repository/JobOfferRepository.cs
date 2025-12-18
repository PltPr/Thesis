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
using Microsoft.AspNetCore.Components.Forms;
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

        public async Task<bool> AddTechnologyToOfferAsync(AddTechnologyDto dto)
        {
            var offer = await _context.JobOffers.FirstOrDefaultAsync(x=>x.Id==dto.JobOfferId);
            if(offer==null)
                throw new Exception("Job offer not found");

            var technology = await _context.Technologies.FirstOrDefaultAsync(x=>x.Name.ToLower()==dto.TechnologyName.ToLower());
            if(technology==null)
            {
                var newTechnology = new Technology
                {
                    Name=dto.TechnologyName
                };
                await _context.Technologies.AddAsync(newTechnology);
                await _context.SaveChangesAsync();
                technology=newTechnology;
            }
            if(dto.Type=="Required")
            {
                var jobOfferTechnology = new JobOfferTechnologyRequired
                {
                    JobOfferId=offer.Id,
                    TechnologyIdRequired=technology.Id
                };
                await _context.JobOfferTechnologiesRequired.AddAsync(jobOfferTechnology);
                await _context.SaveChangesAsync();
                return true;
            }
            if(dto.Type=="NiceToHave")
            {
                var jobOfferTechnology = new JobOfferTechnologyNiceToHave
                {
                    JobOfferId=offer.Id,
                    TechnologyIdNiceToHave=technology.Id
                };
                await _context.JobOfferTechnologiesNiceToHave.AddAsync(jobOfferTechnology);
                await _context.SaveChangesAsync();
                return true;
            }
            throw new Exception("Type error");
        }

        public async Task<bool> DeleteTechnologyFromOfferAsync(DeleteTechnologyDto dto)
        {
            var offer = await _context.JobOffers.FirstOrDefaultAsync(x=>x.Id==dto.JobOfferId);
            if(offer==null)
                throw new Exception("Job offer not found");
            var technology = await _context.Technologies.Where(x=>x.Name==dto.TechnologyName).Select(x=>x.Id).FirstOrDefaultAsync();
            if(technology==0)
                throw new Exception("Technology not found");
            
            if(dto.Type=="NiceToHave")
            {
                var offertechnology = await _context.JobOfferTechnologiesNiceToHave.Where(x=>x.JobOfferId==dto.JobOfferId && x.TechnologyIdNiceToHave==technology).FirstOrDefaultAsync();
                if(offertechnology==null)
                    throw new Exception("Technology is not assigned to this job offer");
                _context.JobOfferTechnologiesNiceToHave.Remove(offertechnology);
                await _context.SaveChangesAsync();
                return true;
            }
            if(dto.Type=="Required")
            {
                var offertechnology = await _context.JobOfferTechnologiesRequired.Where(x=>x.JobOfferId==dto.JobOfferId && x.TechnologyIdRequired==technology).FirstOrDefaultAsync();
                if(offertechnology==null)
                    throw new Exception("Technology is not assigned to this job offer");
                _context.JobOfferTechnologiesRequired.Remove(offertechnology);
                await _context.SaveChangesAsync();
                return true;
            }

            throw new Exception("Wrong type");
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

        public async Task<List<string>> GetJobOffersTitlesAsync()
        {
            List<string> titles = await _context.JobOffers.Select(x=>x.JobTitle).ToListAsync();

            return titles;
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