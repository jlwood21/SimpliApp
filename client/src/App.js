import React, {
    useState
} from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import DailySummary from './components/DailySummary';

function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (title, reminderDate) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
            reminder: reminderDate
        };
        setTasks([...tasks, newTask]);
    };

    const completeTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? {
                ...task,
                completed: !task.completed
            } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > SimpliTask < /h1> <
        /header> <
        AddTaskForm onAdd = {
            addTask
        }
        /> <
        TaskList tasks = {
            tasks
        }
        onComplete = {
            completeTask
        }
        onDelete = {
            deleteTask
        }
        /> <
        DailySummary tasks = {
            tasks
        }
        /> <
        /div>
    );
}

export default App;