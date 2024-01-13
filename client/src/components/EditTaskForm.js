import React, { useState } from 'react';

const EditTaskForm = ({ task, onUpdate }) => {
    const [title, setTitle] = useState(task.title);
    const [reminder, setReminder] = useState(task.reminder);
    const [category, setCategory] = useState(task.category);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(task.id, title, reminder, category);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Edit task title" 
            />
            <input 
                type="date" 
                value={reminder} 
                onChange={(e) => setReminder(e.target.value)} 
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                {/* Add more categories as needed */}
            </select>
            <button type="submit">Update</button>
        </form>
    );
};

export default EditTaskForm;
