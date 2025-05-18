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

namespace api.Controllers
{
    [Route("api/application")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationRepository _appRepo;
        private readonly IJobOfferRepository _offerRepo;
        private readonly UserManager<AppUser> _userManager;
        public ApplicationController(IApplicationRepository appRepo, IJobOfferRepository offerRepo, UserManager<AppUser> userManager)
        {
            _appRepo = appRepo;
            _offerRepo = offerRepo;
            _userManager = userManager;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostApplication([FromBody] AddApplicationDto model)
        {
            var offer = await _offerRepo.GetById(model.JobOfferId);
            if (offer == null) return NotFound();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var result = model.ToApplication(userId, model.JobOfferId);

            await _appRepo.AddAplicationAsync(result);

            return Ok();
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserReservations()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            var reservations = await _appRepo.GetUserApplications(userId);
            var result = reservations.Select(x => x.ApplicationToDto());
            return Ok(result);
        }
    }
}