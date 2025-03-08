using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.JobOffer;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/jobOffer")]
    [ApiController]
    public class JobOfferController : ControllerBase
    {
        private readonly IJobOfferRepository _offerRepository;
        private readonly ApplicationDBContext _context;
        public JobOfferController(IJobOfferRepository offerRepository, ApplicationDBContext context)
        {
            _offerRepository=offerRepository;
            _context=context;
        }



        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var offers =await _offerRepository.GetAllAsync();

            var result = offers.Select(o=>o.ToJobOfferDto()).ToList();

            return Ok(result);

            
        }

        [HttpGet("technologies")]
        public async Task<IActionResult> GetAllTechnologies()
        {
            var result = await _offerRepository.GetAllTechnologiesAsync();

            var resultDto = result.Select(r=>r.asDto()).ToList();

            return Ok(resultDto);
        }

        [HttpPost]
        public async Task<IActionResult> AddJobOffer(AddJobOfferDto jobOfferDto)
        {
            if(!ModelState.IsValid)
            return BadRequest(ModelState);
            
            await _offerRepository.AddJobOfferAsync(jobOfferDto);

            return Ok(jobOfferDto);
            //technologia musi istniec, w przeciwnym wypadku doda sie oferta bez technologi
        }

        


    }
}