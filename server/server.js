const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path as necessary

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

// Add other API routes here

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
