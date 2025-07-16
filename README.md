# TaskManagerApp

Welcome to the **TaskManager** application!  
The purpose of this application is to allow a user to manage tasks — including the ability to **create**, **delete**, and **complete** them.

---

## 📦 Application Components

This application is composed of two main components:

### 1. Backend
- Built using **.NET Core 3.1 Web API**
- Written in **C# 8.0**
- Exposes the following API routes:
  - `GET /tasks` – Retrieve all tasks
  - `POST /tasks/{task}` – Create a new task
  - `PUT /tasks/{id}` – Update a task
  - `DELETE /tasks/{id}` – Delete a task

### 2. Frontend
- Built using **React** and **TypeScript**

---

## 🛠️ How to Run the Application

### 1. SQL Server Setup

- Install **Microsoft SQL Server Management Studio**
- Ensure a SQL Server instance is running and a database is created
- Create the `Tasks` table by executing the following SQL:

```sql
CREATE TABLE Tasks (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000),
    IsCompleted BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL,
    CompletedAt DATETIME NULL,
    [Priority] INT
);
```

### 2. Backend Setup

- Install **Visual Studio**
- Install **.NET Core SDK 3.1**
- Open the solution: `backend\TaskManager\TaskManager.sln`
- Update the `appsettings.json` with your connection string. It should look similar to:

![Connection String](https://github.com/user-attachments/assets/58ac305b-d3d1-412f-871e-c167534de98e)

- Run the project. The API will be accessible at:  
  `https://localhost:44365/`

### 3. Frontend Setup

- Install **Node.js**
- Use **Visual Studio Code**
- Open the frontend project folder
- Run the following commands:

```bash
npm install
npm start
```

After the server starts, you should see:

![React UI](https://github.com/user-attachments/assets/ea1d4147-a56a-4f9b-a30e-ece96595dbbb)

---

## 🧭 Architectural Diagram

![TaskManagerDiagram drawio](https://github.com/user-attachments/assets/59cf6334-6c5f-4469-bffe-6dfef504f78b)
