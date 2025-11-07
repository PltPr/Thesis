using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
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
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDBContext _context;
        public ApplicationController(IApplicationRepository appRepo, IJobOfferRepository offerRepo, UserManager<AppUser> userManager, ApplicationDBContext context)
        {
            _appRepo = appRepo;
            _offerRepo = offerRepo;
            _userManager = userManager;
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

            var application = new Application
            {
                AboutYourself = dto.AboutYourself,
                SimilarExperience = dto.SimilarExperience,
ExpectedMonthlySalary=dto.ExpectedMonthlySalary,
                Date = DateTime.Now,
                Status = "new",
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
        public async Task<IActionResult> GetApplicationsGrouped()
        {
            var result = await _appRepo.GroupedApplications();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPut("AssignTestToApp")]
        public async Task<IActionResult> AssignTestToApp(int appId, int testId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.AssignTestToAppAsync(appId, testId);

            return Ok(result);
        }
        [HttpPut("RejectApp")]
        public async Task<IActionResult> RejectApp([FromBody] RejectAppDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _appRepo.RejectAppAsync(dto.Id);
            if (result == null)
                return NotFound();

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result.ToDto());
        }
        
    }
    
}