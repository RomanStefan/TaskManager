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
                ORDER BY Priority ASC, CreatedAt DESC"
            ;


            var taskItemList = await _connection.QueryAsync<TaskItem>(query);

            return taskItemList;
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            const string insertQuery = @"
                INSERT INTO Tasks (Title, Description, IsCompleted, CreatedAt, Priority)
                VALUES (@Title, @Description, @IsCompleted, @CreatedAt, @Priority);
                SELECT CAST(SCOPE_IDENTITY() as int);";
            var id = await _connection.ExecuteScalarAsync<int>(insertQuery, task);
            task.Id = id;
            return task;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            const string deleteQuery = "DELETE FROM Tasks WHERE Id = @Id";
            var affectedRows = await _connection.ExecuteAsync(deleteQuery, new { Id = id });
            return affectedRows > 0;
        }
    }
}
