import React from 'react';

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
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
            <button onClick={() => onEdit(task)}>Edit</button>
        </div>
    );
};

export default TaskItem;
