using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AppalicationDto;
using api.Dtos.NoteMessageDto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteMessageController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IApplicationRepository _appRepo;
        private readonly INoteMessageRepository _infoRepo;
        public NoteMessageController(ApplicationDBContext context, IApplicationRepository appRepo, INoteMessageRepository infoRepo)
        {
            _context = context;
            _appRepo = appRepo;
            _infoRepo = infoRepo;
        }
        [HttpPost("AddNote")]
        public async Task<IActionResult> AddNoteToApp(AddNoteDto noteDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var app = await _appRepo.GetByIdAsync(noteDto.ApplicationId);
            if (app == null)
                return NotFound();

            var adderId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (adderId == null)
                return Unauthorized();

            var model = noteDto.ToNote(adderId);

            var result = await _infoRepo.AddNoteAsync(model);

            return CreatedAtAction(nameof(GetNoteById), new { id = result.Id }, result.ToNoteDto());
        }
        [HttpGet("GetNoteById")]
        public async Task<IActionResult> GetNoteById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var note = await _infoRepo.GetNoteByIdAsync(id);
            if (note == null)
                return NotFound();

            var result = note.ToNoteDto();

            return Ok(result);
        }
        [HttpPost("AddMessage")]
        public async Task<IActionResult> AddMessage(AddMessageDto messageDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var adderId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (adderId == null)
                return Unauthorized();

            var message = messageDto.ToMessage(adderId);
            var result = await _infoRepo.AddMessageAsync(message);

            return CreatedAtAction(nameof(GetMessageById), new { id = result.Id }, result.ToMessageDto());
        }
        [HttpGet("GetMessageById")]
        public async Task<IActionResult> GetMessageById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var message = await _infoRepo.GetMessageByIdAsync(id);
            if (message == null)
                return NotFound();

            var result = message.ToMessageDto();

            return Ok(result);
        }
    }
}