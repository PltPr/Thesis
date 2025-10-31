using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CompilerDto;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompillatorController :ControllerBase
    {
        private readonly ICompillerRepository _compRepo;
        public CompillatorController(ICompillerRepository compRepo)
        {
            _compRepo = compRepo;
        }
        [HttpPost("Compile")]
        public async Task<IActionResult>Compile(CompileRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _compRepo.CompileAsync(request);

            return Ok(result);
        }
    }
}