import React from 'react';

const DailySummary = ({
    tasks
}) => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;

    return ( <
        div className = "daily-summary" >
        <
        h2 > Daily Summary < /h2> <
        p > Completed Tasks: {
            completedTasks
        } < /p> <
        p > Pending Tasks: {
            pendingTasks
        } < /p> <
        /div>
    );
};

export default DailySummary;