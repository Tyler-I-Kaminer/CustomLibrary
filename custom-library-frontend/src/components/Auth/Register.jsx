import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend for user registration
            await axios.post('http://localhost:3000/users/register', { username, email, password });
    
            // Show a success message and redirect to login
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page
            }, 2000);
        } catch (err) {
            // Handle registration errors
            setMessage('Error during registration. Please try again.');
        }
    };
    

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Already have an account? <Link to="/">Login here</Link>.
            </p>
        </div>
    );
};

export default Register;
