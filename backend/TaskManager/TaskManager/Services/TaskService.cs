using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.DTOs;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }   

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            var tasks = await _taskRepository.GetAllAsync();
            return tasks;
        }

        public async Task<TaskItem> CreateTaskAsync(CreateTaskDto newTask)
        {
            if(newTask == null)
            {
                throw new ArgumentNullException("New task cannot be null");
            }

            var task = new TaskItem
            {
                Title = newTask.Title,
                Description = newTask.Description,
                Priority = newTask.Priority,
                CreatedAt = DateTime.UtcNow,
                IsCompleted = false
            };
            return await _taskRepository.CreateTaskAsync(task);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid task id. Id must be a positive integer.");
            }

            return await _taskRepository.DeleteAsync(id);
        }

        public async Task<bool> CompleteTaskAsync(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid task id. Id must be a positive integer.");
            }

            return await _taskRepository.CompleteAsync(id);
        }
    }
}
