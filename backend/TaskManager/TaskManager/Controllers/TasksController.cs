using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.DTOs;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ILogger<TasksController> _logger;
        private readonly ITaskService _taskService;

        public TasksController(ILogger<TasksController> logger, ITaskService taskService)
        {
            _logger = logger;
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAllTasks()
        {
            try
            {
                var tasks = await _taskService.GetAllTasksAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode(500, "An error occurred while retrieving tasks.");
            }
        }

        [HttpPost("CreateTask")]
        public async Task<ActionResult<TaskItem>> CreateTask([FromBody] CreateTaskDto newTask)
        {
            if (string.IsNullOrWhiteSpace(newTask.Title))
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdTask = await _taskService.CreateTaskAsync(newTask);
                return Ok(createdTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode(500, "An error occurred while creating the task.");
            }
        }

        [HttpDelete("DeleteTask")]
        public async Task<IActionResult> DeleteTask([FromQuery] int id)
        {
            try
            {
                var deleted = await _taskService.DeleteTaskAsync(id);
                if (!deleted)
                    return NotFound($"Task with Id {id} not found.");
                return Ok("Task deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting task");
                return StatusCode(500, "An error occurred while deleting the task.");
            }
        }

        [HttpPut("CompleteTask")]
        public async Task<IActionResult> CompleteTask([FromQuery] int id)
        {
            try
            {
                var completed = await _taskService.CompleteTaskAsync(id);
                if (!completed)
                    return NotFound($"Task with Id {id} not found.");
                return Ok("Task completed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error completing task");
                return StatusCode(500, "An error occurred while completing the task.");
            }
        }
    }
}
