using NSubstitute;
using System;
using TaskManager.DTOs;
using TaskManager.Interfaces;
using TaskManager.Models;
using TaskManager.Services;
using Xunit;

namespace TaskManagerTests
{
    public class TaskServiceTests
    {

        private readonly ITaskRepository _taskRepositoryFake;

        public TaskServiceTests()
        {
            _taskRepositoryFake = Substitute.For<ITaskRepository>();
        }

        private TaskService GetTaskService()
        {
            return new TaskService(_taskRepositoryFake);
        }

        [Fact]
        public void TaskService_CreateTaskAsync_ThereIsAValidNewTask_CallCreateTaskAsyncFromRepositoryIsCalledOneTimeWithRightParameter()
        {
            //Arange
            var taskService = GetTaskService();
            var newTask = new CreateTaskDto
            {
                Title = "Test",
                Description = "Description",
                Priority = 1
            };

            //Act

            var result = taskService.CreateTaskAsync(newTask);

            //Assert
            _taskRepositoryFake.Received(1).CreateTaskAsync(Arg.Is<TaskItem>(item => item != null));

        }

        [Fact]
        public void TaskService_CreateTaskAsync_ThereIsNullAsParameter_DoNotCallCreateTaskAsyncFromRepository()
        {
            //Arange
            var taskService = GetTaskService();

            //Act
            var result = taskService.CreateTaskAsync(null);

            //Assert
            _taskRepositoryFake.DidNotReceive().CreateTaskAsync(Arg.Any<TaskItem>());
        }
    }
}
