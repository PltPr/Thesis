using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TaskDto;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepo;
        public TaskController(ITaskRepository taskRepo)
        {
            _taskRepo = taskRepo;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var task = await _taskRepo.GetByIdAsync(id);
            if (task == null)
                return NotFound();

            var result = task.toTaskDto();

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _taskRepo.GetAllAsync();
            if (tasks == null)
                return NotFound();

            var result = tasks.Select(t => t.toTaskDto());

            return Ok(result);
        }

        [HttpPost("CreateTask")]
        public async Task<IActionResult> CreateTask(CreateTaskDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var task = model.toTaskItem();
            var result = await _taskRepo.AddTaskAsync(task);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("GetTasksForTest")]
        public async Task<IActionResult> GetTasksForTest(int testId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var tasks = await _taskRepo.GetAllTasksForTestAsync(testId);
            if (tasks == null)
                return NotFound();

            var result = tasks.Select(x => x.toTaskDto());

            return Ok(result);
        }
        [HttpGet("GetAllTasksForSolving")]
        public async Task<IActionResult>GetAllTasksForSolving(int appId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _taskRepo.GetAllTasksForSolvingAsync(appId);

            return Ok(result);
        }
        
        [HttpPost("AddSolutionForTask")]
        public async Task<IActionResult>AddSolutionForTask(AddSolutionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var solution = dto.toCodeSubmission();
            var result = await _taskRepo.AddSolutionForTaskAsync(solution);

            return Ok(result);
        }
        [HttpGet("GetCodeSubmissionForTask")]
        public async Task<IActionResult> GetCodeSubmissionForTask(int appId,int taskId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _taskRepo.GetCodeSubmissionForTask(appId, taskId);
            if (result == null)
                return NotFound();

            return Ok(result);

        }
        [HttpGet("GetCodeSubmissionForAllTasks")]
        public async Task<IActionResult> GetCodeSubmissionForAllTasks(int appId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _taskRepo.GetCodeSubmissionForAllTask(appId);
            if (result == null)
                return NotFound();

            return Ok(result);

        }
        [HttpPut("AddEvaluationForSolution")]
        [Authorize(Roles = "Admin,Examiner")]
        public async Task<IActionResult>AddEvaluationForSolution([FromBody] AddEvaluationForSolutionDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var result = await _taskRepo.AddEvaluationForSolutionAsync(dto);
            if(result==null)
                return NotFound();

            return Ok(result);
        }

	}
}