using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly ITestRepository _testRepo;
        private readonly UserManager<AppUser>_userManager;
        public ApplicationRepository(ApplicationDBContext context,ITestRepository testRepo, UserManager<AppUser>userManager)
        {
            _context = context;
            _testRepo=testRepo;
            _userManager=userManager;
        }
        public async Task<Application> AddAplicationAsync(Application model)
        {
            await _context.Applications.AddAsync(model);
            await _context.SaveChangesAsync();
                await _context.Entry(model).Reference(a => a.AppUser).LoadAsync();
    await _context.Entry(model).Reference(a => a.CV).LoadAsync();
    await _context.Entry(model).Reference(a => a.JobOffer).LoadAsync();
    await _context.Entry(model).Reference(a => a.Test).LoadAsync();
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

        public async Task<bool> CheckIfUserApplied(string userId, int offerId)
        {
            return await _context.Applications.Where(x=>x.AppUserId==userId && x.JobOfferId==offerId).AnyAsync();
        }

        public async Task<Application?> GetByIdAsync(int id)
        {
            var app = await _context.Applications
            .Include(t => t.Test)
            .Include(a => a.CV)
            .Include(a => a.JobOffer)
            .Include(a=>a.AppUser)
            .FirstOrDefaultAsync(t => t.Id == id);

            if (app == null)
                return null;

            return (app);
        }

        public async Task<List<GetClassificationGroupDto>> GetClassificationAsync()
        {
            var apps = await _context.Applications.Include(x=>x.AppUser).Include(x=>x.JobOffer).Include(x=>x.ApplicationEvaluation).Where(a=>a.Status=="Test evaluated"||a.Status=="Interview"||(a.Status=="Rejected"&&a.TestId!=null)).ToListAsync();

            var grouped = apps.GroupBy(app=>app.JobOffer.JobTitle);
            
            var result = new List<GetClassificationGroupDto>();

            foreach(var group in grouped)
            {
                var app = group.Select(async app =>
                {
                    var dto = app.toGetClassificationDto();
                    var testRating = await _testRepo.GetOverallTestRatingAsync(app.Id);
                    dto.EvaluationScore=Math.Round(dto.EvaluationScore+(testRating*0.2),2);
                    return dto;
                });

                var applicationsWithUpdatedScore = await Task.WhenAll(app);

                result.Add(new GetClassificationGroupDto
                {
                    JobTitle=group.Key,
                    Applications=applicationsWithUpdatedScore.ToList()
                });
            }
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
            var result = await _context.Applications.Include(a=>a.AppUser).Include(a => a.CV).Include(a => a.JobOffer).Where(x => x.AppUserId == userId).ToListAsync();
            return result;
        }

        public async Task<GetSummaryDto?> GetUserSummaryAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user==null)
                throw new Exception("User not found");
            
            var apps = await _context.Applications.Include(x=>x.JobOffer).Where(x=>x.AppUserId==userId).ToListAsync();
            if(apps.Count==0)
                return new GetSummaryDto
                {
                    UserId=userId,
                    Applications=new List<ApplicationSummary>()
                };
            
            var appsSumaries = apps.Select(x=>x.toApplicationSummaricDto()).ToList();

            return new GetSummaryDto
            {
                UserId=userId,
                Applications=appsSumaries
            };
            
        }

        public async Task<List<GroupApplicationsDto>> GroupedApplications(ApplicationsQueryObject query)
        {
            var applications = _context.Applications.AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.JobTitle))
            {
                applications = applications.Where(a=>a.JobOffer.JobTitle==query.JobTitle);
            }
            if(!string.IsNullOrWhiteSpace(query.Status))
            {
                applications=applications.Where(a=>a.Status==query.Status);
            }


            var result= await applications
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


            return result;
        }

        public async Task<Application?> InviteToInterview(int appId)
        {
            var app = await _context.Applications.FirstOrDefaultAsync(x=>x.Id==appId);
            if(app==null)
                return null;

            app.Status="Interview";
            await _context.SaveChangesAsync();

            return app;

        }

        public async Task<Application?> RejectAppAsync(int appId)
        {
            var app = await _context.Applications.Include(x=>x.AppUser).Include(c => c.CV).FirstOrDefaultAsync(x => x.Id == appId);
            if (app == null)
                return null;

            app.Status = "Rejected";

            await _context.SaveChangesAsync();

            return app;
        }
    }
}