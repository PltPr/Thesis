using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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

        public async Task<Application> AssignTestToAppAsync(int appId, int testId)
        {
            var application = await _context.Applications.FindAsync(appId);
            if (application == null)
                return null;

            application.TestId = testId;
            application.Status = "Test assigned";
            
            await _context.SaveChangesAsync();

            return application;
        }

        public async Task<Application> GetByIdAsync(int id)
        {
            var app = await _context.Applications
            .Include(t => t.Test)
            .Include(a => a.CV)
            .Include(a => a.JobOffer)
            .FirstOrDefaultAsync(t => t.Id == id);

            if (app == null)
                return null;

            return (app);
        }

        public async Task<List<Application>> GetUserApplications(string userId)
        {
            var result = await _context.Applications.Include(a=>a.CV).Include(a=>a.JobOffer).Where(x => x.AppUserId == userId).ToListAsync();
            return result;
        }

        public async Task<List<GroupApplicationsDto>> GroupedApplications()
        {
            var applications = await _context.Applications
            .GroupBy(app => app.JobOffer.JobTitle)
            .Select(group => new GroupApplicationsDto
            {
                JobOfferTitle = group.Key,
                applications = group.Select(app => new GroupedApps
                {
                    Description = app.Description,
                    Date = app.Date,
                    CvId = app.CvId,
                    CvFileName = app.CV.CvFileName,
                    Status = app.Status
                }).ToList()
            }).ToListAsync();

            return applications;
        }
    }
}