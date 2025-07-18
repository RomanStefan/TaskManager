import React from 'react';
import { TaskProvider } from './Context/TasksContext';
import TaskManager from './Components/TaskManager';


const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1 style={{marginLeft:'20px'}}>Task List</h1>
        <TaskManager />
      </div>
    </TaskProvider>
  );
};

export default App;