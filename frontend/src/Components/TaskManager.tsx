
import React, { useContext, useState } from 'react';
import { TaskContext } from '../Context/TasksContext';
import CreateTaskModal from './CreateTaskModal';


const TaskManager: React.FC = () => {
  const context = useContext(TaskContext);
  const [modalOpen, setModalOpen] = useState(false);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { tasks } = context;

  const handleCreateTask = (name: string, description: string, priority: number) => {
    // TODO: Implement task creation logic here
    alert(`Task created! Name: ${name}, Description: ${description}`);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button
        style={{ background: '#47e73cff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '8px' }}
        onClick={() => setModalOpen(true)}
      >
        Create New Task
      </button>
      <CreateTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTask}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {tasks.map((task, index) => (
          <div key={task.id ?? index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', minWidth: '250px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description || 'N/A'}</p>
            <p><strong>Status:</strong> {task.isCompleted ? 'Completed' : 'Pending'}</p>
            <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
            <p><strong>Completed At:</strong> {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <button style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => alert(`Delete task ${task.id}`)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;