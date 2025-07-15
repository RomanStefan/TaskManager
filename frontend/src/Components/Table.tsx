import React, { useContext } from 'react';
import { TaskContext } from '../Context/TasksContext';
const TasksTable: React.FC = () => {
  const context = useContext(TaskContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { tasks } = context;

  return (
    <div>
      <h2>Tasks</h2>
      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Is Completed</th>
            <th>Created At</th>
            <th>Completed At</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.isCompleted ? 'Yes' : 'No'}</td>
              <td>{new Date(task.createdAt).toLocaleString()}</td>
              <td>
                {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}
              </td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;