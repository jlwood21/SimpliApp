import React from 'react';

const TaskItem = ({ task, onComplete, onDelete }) => {
    return (
        <div className="task-item">
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => onComplete(task.id)} 
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
            </span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
