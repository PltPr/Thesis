using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/jobOffer")]
    [ApiController]
    public class JobOfferController : Controller
    {
        private readonly IJobOfferRepository _offerRepository;
        public JobOfferController(IJobOfferRepository offerRepository)
        {
            _offerRepository=offerRepository;
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


    }
}