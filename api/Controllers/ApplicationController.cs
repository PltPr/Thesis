using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace api.Controllers
{
    [Route("api/application")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationRepository _appRepo;
        private readonly IJobOfferRepository _offerRepo;
        private readonly ApplicationDBContext _context;
        public ApplicationController(IApplicationRepository appRepo, IJobOfferRepository offerRepo, UserManager<AppUser> userManager, ApplicationDBContext context)
        {
            _appRepo = appRepo;
            _offerRepo = offerRepo;
            _context = context;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostApplication([FromForm] AddApplicationDto dto)
        {
            var offer = await _offerRepo.GetById(dto.JobOfferId);
            if (offer == null) return NotFound();

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            if(await _appRepo.CheckIfUserApplied(userId,dto.JobOfferId))
                return BadRequest(new{message="You have already applied for this job offer"});

            var application = new Application
            {
                AboutYourself = dto.AboutYourself,
                SimilarExperience = dto.SimilarExperience,
                ExpectedMonthlySalary = dto.ExpectedMonthlySalary,
                Date = DateTime.Now,
                Status = "New",
                AppUserId = userId,
                JobOfferId = dto.JobOfferId
            };

            if (dto.CV != null && dto.CV.Length > 0)
            {
                using var ms = new MemoryStream();
                await dto.CV.CopyToAsync(ms);

                var cv = new CV
                {
                    CvFileName = dto.CV.FileName,
                    CvData = ms.ToArray()
                };
                await _context.CVs.AddAsync(cv);
                await _context.SaveChangesAsync();
                application.CvId = cv.Id;
            }
            await _appRepo.AddAplicationAsync(application);




            return CreatedAtAction(nameof(GetById), new { id = application.Id }, application.ToDto());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();



            var application = await _appRepo.GetByIdAsync(id);

            var result = application.ToDto();

            return Ok(result);
        }


        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserApplications()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            var reservations = await _appRepo.GetUserApplications(userId);
            var result = reservations.Select(x => x.ToDto());
            return Ok(result);
        }


        [HttpGet("DownloadCV")]
        [Authorize]
        public async Task<IActionResult> DownloadCV(int id)
        {
            var cv = await _context.CVs.FindAsync(id);
            if (cv == null) return NotFound();

            return File(cv.CvData, "application/pdf", cv.CvFileName);
        }

        [HttpGet("GroupedApps")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult> GetApplicationsGrouped([FromQuery] ApplicationsQueryObject query)
        {
            var result = await _appRepo.GroupedApplications(query);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPut("AssignTestToApp")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult> AssignTestToApp(int appId, int testId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.AssignTestToAppAsync(appId, testId);

            return Ok(result);
        }
        [HttpPut("RejectApp")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult> RejectApp([FromBody] RejectAppDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.RejectAppAsync(dto.Id);
            if (result == null)
                return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result.ToDto());
        }
        [HttpPost("AddAppEvaluation")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult> AddEvaluationForApp([FromBody] AddAppEvaluationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.AddEvaluationForAppAsync(dto);
            if (result == null)
                return NotFound();

            return Ok(dto);
        }
        [HttpGet("GetAppEvaluation")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task <IActionResult>GetEvaluationForApp(int appId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var evaluation = await _appRepo.GetEvaluationForAppAsync(appId);

            if (evaluation == null)
                return NotFound();

            var result = evaluation.toAppEvaluationDto();

            return Ok(result);
        }
        [HttpGet("GetClassification")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult>GetClassification()
        {
            var result = await _appRepo.GetClassificationAsync();
            return Ok(result);
        }   

        [HttpPut("InviteToInterview")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult>InviteToInterview(int appId)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.InviteToInterview(appId);
            if(result == null)
                return NotFound();

            return Ok(new{ Status=result.Status});
        }
        [HttpGet("UserSummary/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>GetUserSummary([FromRoute]string userId)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.GetUserSummaryAsync(userId);

            return Ok(result);
        }

    }
}