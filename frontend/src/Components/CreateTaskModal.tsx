import React, { useContext } from 'react';
import { TaskContext } from '../Context/TasksContext';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, priority: number) => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(1);

  const context = useContext(TaskContext);
  if (!context) return null;
  const { createTask } = context;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(title, description, priority);
    onSubmit(title, description, priority);
    setTitle('');
    setDescription('');
    setPriority(1);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0000004d', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label>Task Title:</label><br />
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Task Description:</label><br />
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label>Priority:</label><br />
            <select value={priority} onChange={e => setPriority(Number(e.target.value))} style={{ width: '100%', padding: '8px' }}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#ccc', color: '#333' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', background: '#47e73cff', color: '#fff' }}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
