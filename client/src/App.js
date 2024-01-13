import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import DailySummary from './components/DailySummary';

function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            fetch('/tasks', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setTasks(data))
                .catch(err => console.error('Error fetching tasks:', err));
        }
    }, [token]);

    const handleLogin = async (username, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data.user);
        } else {
            console.error('Login failed');
        }
    };

    const handleRegister = async (username, password) => {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            console.log('Registration successful');
        } else {
            console.error('Registration failed');
        }
    };

    const addTask = (title, reminderDate, category) => {
        fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title, reminderDate, category })
        })
        .then(res => res.json())
        .then(newTask => setTasks([...tasks, newTask]))
        .catch(err => console.error('Error adding task:', err));
    };

    const updateTask = (id, title, reminder, category) => {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title, reminder, category })
        })
        .then(res => res.json())
        .then(updatedTask => {
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
            setEditingTask(null);
        })
        .catch(err => console.error('Error updating task:', err));
    };

    const completeTask = (id) => {
        const task = tasks.find(t => t.id === id);
        const updatedStatus = !task.completed;
        updateTask(id, task.title, task.reminder, task.category, updatedStatus);
    };

    const deleteTask = (id) => {
        fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(err => console.error('Error deleting task:', err));
    };

    const editTask = (task) => {
        setEditingTask(task);
    };

    return (
        <div className="App">
            {token ? (
                <>
                    {editingTask ? (
                        <EditTaskForm task={editingTask} onUpdate={updateTask} />
                    ) : (
                        <AddTaskForm onAdd={addTask} />
                    )}
                    <TaskList 
                        tasks={tasks} 
                        onComplete={completeTask} 
                        onDelete={deleteTask}
                        onEdit={editTask} 
                    />
                    <DailySummary tasks={tasks} />
                </>
            ) : (
                <>
                    <Login onLogin={handleLogin} />
                    <Register onRegister={handleRegister} />
                </>
            )}
        </div>
    );
}

export default App;
