import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [, setUser] = useState(null);

    // Handle user registration
    const handleRegister = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            // Handle registration success (e.g., store user data, redirect, etc.)
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error (e.g., show error message)
        }
    };

    // Handle user login
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            setUser(data.user);
            // Handle login success (e.g., store user data, redirect, etc.)
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (e.g., show error message)
        }
    };

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>SimpliTask</h1>
            </header>
            <Register onRegister={handleRegister} />
            <Login onLogin={handleLogin} />
        </div>
    );
}

export default App;
