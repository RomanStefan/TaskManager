import React from 'react';
import { TaskProvider } from './Context/TasksContext';
import TasksTable from './Components/Table';


const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1>Task List</h1>
        <TasksTable />
      </div>
    </TaskProvider>
  );
};

export default App;