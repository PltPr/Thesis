using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TestDto;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IApplicationRepository _appRepo;
        private readonly ITestRepository _testRepo;
        public TestController(IApplicationRepository appRepo, ITestRepository testRepo)
        {
            _appRepo = appRepo;
            _testRepo = testRepo;
        }
        [HttpPost("CreateTest")]
        public async Task<IActionResult> CreateTest(AddTestDto testDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _testRepo.AddTestAsync(testDto);
            if (result == null)
                return Ok(new Exception("Cannot create test"));

            var dto = result.toDto();

            return CreatedAtAction(nameof(GetTestById), new { id = result.Id }, dto);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var test = await _testRepo.GetByIdAsync(id);
            var result = test.toDto();

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var tests = await _testRepo.GetAllAsync();
            var result = tests.Select(t => t.toDto());
            return Ok(result);
        }

    }
}