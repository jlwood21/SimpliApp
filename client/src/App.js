import logo from './logo.svg';
import './App.css';
import React from 'react';
import TaskList from './components/TaskList';
import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const sampleTasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: true }
  ];
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>SimpliTask</h1>
      </header>
      <AddTaskForm onAdd={(title) => console.log(title)} />
      <TaskList tasks={sampleTasks} /> {/* Pass sampleTasks to TaskList */}
    </div>
  );
}

export default App;

