import React, { useState } from 'react';

const AddTaskForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        onAdd(title, reminder, category);
        setTitle('');
        setReminder('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Add a new task" 
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
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTaskForm;
