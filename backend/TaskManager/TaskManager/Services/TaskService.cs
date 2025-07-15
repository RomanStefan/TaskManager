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
            return await _taskRepository.DeleteAsync(id);
        }

        public async Task<bool> CompleteTaskAsync(int id)
        {
            return await _taskRepository.CompleteAsync(id);
        }
    }
}
