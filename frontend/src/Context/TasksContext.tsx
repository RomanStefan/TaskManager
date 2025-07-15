import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface TaskItem {
  id: number;
  title: string;
  description?: string; 
  isCompleted: boolean;
  createdAt: string; 
  completedAt?: string | null;
  priority: number;
}

interface TaskContextType {
  tasks: TaskItem[];
  fetchTasks: () => void;
createTask: (title: string, description: string, priority: number) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:44365/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: TaskItem[] = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const createTask = async (title: string, description: string, priority: number) => {
    try {
      const response = await fetch("https://localhost:44365/tasks/CreateTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, priority }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:44365/tasks/DeleteTask?id=${id}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, createTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};