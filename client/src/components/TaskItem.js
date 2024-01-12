import React from 'react';

const TaskItem = ({ title }) => {
    return (
        <div className="task-item">
            <span>{title}</span>
            <button>Complete</button>
        </div>
    );
};

export default TaskItem;

