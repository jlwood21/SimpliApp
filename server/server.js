const express = require('express');
const User = require('./models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
});


app.get('/', (req, res) => {
    res.send('Welcome to the SimpliTask API!');
});


// User login endpoint
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({ error: 'Login failed!' });
        }
        const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '2h' });
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'An error occurred during login' });
    }
});

// Add other endpoints and middleware as needed

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
