using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.DTOs;
using TaskManager.Models;

namespace TaskManager.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
    }
}
