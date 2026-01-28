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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/jobOffer")]
    [ApiController]
    public class JobOfferController : ControllerBase
    {
        private readonly IJobOfferRepository _offerRepository;

        public JobOfferController(IJobOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery]JobOfferQueryObject query)
        {
            var offers = await _offerRepository.GetAllAsync(query);

            var result = offers.Select(o => o.ToJobOfferDto()).ToList();

            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult>GetById([FromRoute]int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var offer = await _offerRepository.GetById(id);
            if(offer==null)
                return NotFound();
            
            var result = offer.ToJobOfferDto();

            return Ok(result);
        }

        [HttpGet("GetByTitle/{title}")]
        public async Task<IActionResult>GetByTitle([FromRoute]string title)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var offer = await _offerRepository.GetByTitleAsync(title);
            if(offer==null)
                return NotFound();
            
            var result = offer.ToJobOfferDto();

            return Ok(result);
        }
        [HttpGet("GetByAppId/{id}")]
        public async Task<IActionResult>GetByAppId([FromRoute]int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var offer = await _offerRepository.GetByAppIdAsync(id);
            if(offer==null)
                return NotFound();
            
            var result = offer.ToJobOfferDto();

            return Ok(result);
        }

        [HttpGet("technologies")]
        public async Task<IActionResult> GetAllTechnologies()
        {
            var result = await _offerRepository.GetAllTechnologiesAsync();

            var resultDto = result.Select(r => r.asDto()).ToList();

            return Ok(resultDto);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddJobOffer(AddJobOfferDto jobOfferDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _offerRepository.AddJobOfferAsync(jobOfferDto);

            return Ok(jobOfferDto);
        }

        [HttpGet("GetJobOfferTitles")]
        public async Task<IActionResult> GetJobOfferTitles()
        {
            var result = await _offerRepository.GetJobOffersTitlesAsync();

            return Ok(result);
        }
        [HttpDelete("DeleteTechnologyFromOffer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>DeleteTechnologyFromOffer([FromBody]DeleteTechnologyDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            try
            {
                var result = await _offerRepository.DeleteTechnologyFromOfferAsync(dto);
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(new {message=ex.Message});
            }
        }
        [HttpPost("AddTechnologyToOffer")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>AddTechnologyToOffer([FromBody]AddTechnologyDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            try
            {
                var result = await _offerRepository.AddTechnologyToOfferAsync(dto);
                return Ok();
            }catch(Exception ex)
            {
                return BadRequest(new {message=ex.Message});
            }
            
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>UpdateJobOffer(int id,UpdateJobOfferDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            try
            {
                var result = await _offerRepository.UpdateJobOfferAsync(id,dto);
                return Ok(result.ToJobOfferDto());
            }
            catch(Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
            
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task <IActionResult> DeleteJobOffer(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            try
            {
                var result = await _offerRepository.DeleteJobOffer(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
        [HttpPut("ChangeVisibility/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>ChangeVisibility(int id,bool visibility)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            try
            {
                var result = await _offerRepository.ChangeVisibilityAsync(id,visibility);
                return Ok();
            }
            catch(Exception ex)
            {
                return NotFound(new {message=ex.Message});
            }
        }
    }
}