import React from 'react';
import TaskItem from './TaskItem'; // Make sure to import TaskItem

const TaskList = ({ tasks }) => { // Add a 'tasks' prop
  return (
    <div className="task-list">
      {tasks.map(task => ( // Map through the tasks and render a TaskItem for each
        <TaskItem key={task.id} title={task.title} />
      ))}
    </div>
  );
};

export default TaskList;
