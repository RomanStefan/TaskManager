using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using TaskManager.Interfaces;
using TaskManager.Models;

namespace TaskManager.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly IDbConnection _connection;

        public TaskRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync()
        {

            const string query = @"
                SELECT Id, Title, Description, IsCompleted, CreatedAt, CompletedAt, Priority 
                FROM Tasks 
                ORDER BY Priority DESC, CreatedAt DESC"
            ;


            var taskItemList = await _connection.QueryAsync<TaskItem>(query);

            return taskItemList;
        }
    }
}
