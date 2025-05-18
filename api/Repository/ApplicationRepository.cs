using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDBContext _context;
        public ApplicationRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Application> AddAplicationAsync(Application model)
        {
            await _context.Applications.AddAsync(model);
            await _context.SaveChangesAsync();
            return model;
        }

        public async Task<List<Application>> GetUserApplications(string userId)
        {
            var result = await _context.Applications.Include(a=>a.JobOffer).Where(x => x.AppUserId == userId).ToListAsync();
            return result;
        }
    }
}