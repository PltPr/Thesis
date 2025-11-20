using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<ApplicationEvaluation?> AddEvaluationForAppAsync(AddAppEvaluationDto dto)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x => x.Id == dto.AppId);
            if (app == null)
                return null;

            var evaluation = dto.ToAppEvaluationModel();

            app.ApplicationEvaluation = evaluation;

            await _context.SaveChangesAsync();

            return evaluation;

        }

        public async Task<Application?> AssignTestToAppAsync(int appId, int testId)
        {
            var application = await _context.Applications.FindAsync(appId);
            if (application == null)
                return null;

            application.TestId = testId;
            application.Status = "Test assigned";
            application.AssignTestDate = DateTime.Now;

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

        public async Task<List<GetClassificationGroupDto>> GetClassificationAsync()
        {
            var apps = await _context.Applications.Include(x=>x.AppUser).Include(x=>x.JobOffer).Include(x=>x.ApplicationEvaluation).Where(a=>a.Status=="Test Evaluated").ToListAsync();

            var result = apps.GroupBy(app=>app.JobOffer.JobTitle)
            .Select(g=> new GetClassificationGroupDto
            {
                JobTitle=g.Key,
                Applications=g.Select(app=>app.toGetClassificationDto()).ToList()
            }).ToList();

            return result;
        }

        public async Task<ApplicationEvaluation?> GetEvaluationForAppAsync(int appId)
        {
            var app = await _context.Applications.Include(x=>x.ApplicationEvaluation).FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;

            var evaluation = app.ApplicationEvaluation;

            return evaluation;
        }

        public async Task<List<Application>> GetUserApplications(string userId)
        {
            var result = await _context.Applications.Include(a => a.CV).Include(a => a.JobOffer).Where(x => x.AppUserId == userId).ToListAsync();
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
                    Id = app.Id,
                    Name = app.AppUser.Name,
                    Surname = app.AppUser.Surname,
                    AboutYourself = app.AboutYourself,
                    SimilarExperience = app.SimilarExperience,
                    ExpectedMonthlySalary = app.ExpectedMonthlySalary,
                    Date = app.Date,
                    CvId = app.CvId,
                    CvFileName = app.CV.CvFileName,
                    Status = app.Status,
                    TestId = app.TestId,
                    AssignTestDate = app.AssignTestDate
                }).ToList()
            }).ToListAsync();

            return applications;
        }

        public async Task<Application?> RejectAppAsync(int appId)
        {
            var app = await _context.Applications.Include(c => c.CV).FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;

            app.Status = "Rejected";

            await _context.SaveChangesAsync();

            return app;
        }
    }
}