import React, {
    useState
} from 'react';

const AddTaskForm = ({
    onAdd
}) => {
    const [title, setTitle] = useState('');
    const [reminder, setReminder] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        onAdd(title, reminder);
        setTitle('');
        setReminder('');
    };

    return ( <
        form onSubmit = {
            handleSubmit
        } >
        <
        input type = "text"
        value = {
            title
        }
        onChange = {
            (e) => setTitle(e.target.value)
        }
        placeholder = "Add a new task" /
        >
        <
        input type = "date"
        value = {
            reminder
        }
        onChange = {
            (e) => setReminder(e.target.value)
        }
        /> <
        button type = "submit" > Add < /button> <
        /form>
    );
};

export default AddTaskForm;