
import React, { useContext, useState } from 'react';
import { TaskContext } from '../Context/TasksContext';
import CreateTaskModal from './CreateTaskModal';
import Toast from './Toast';


const TaskManager: React.FC = () => {
  const context = useContext(TaskContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (!context) {
    return <div>Loading...</div>;
  }

    const { tasks, deleteTask, completeTask } = context;

  const handleCreateTask = (title: string, description: string, priority: number) => {
    setToast('Task created!');
  };

  const handleDeleteTask = async (id: number, title: string) => {
    if (window.confirm('Are you sure you want to delete: ' + title + '?')) {
      await deleteTask(id);
      setToast('Task deleted successfully');
    }
  };

    const handleCompleteTask = async (id: number, title: string) => {
      if (window.confirm('Are you sure you want to complete the task: ' + title + '?')) {
      await completeTask(id);
          setToast('Task marked as completed');
    }
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
            <button style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }} onClick={() => handleDeleteTask(task.id, task.title)}>Delete</button>
            {!task.isCompleted && (
              <button
                style={{ background: '#2ecc40', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                onClick={() => handleCompleteTask(task.id, task.title)}
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default TaskManager;