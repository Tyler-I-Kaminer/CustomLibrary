import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend for login
            const response = await axios.post('http://localhost:3000/users/login', { email, password });
            
            // Save the token in localStorage
            localStorage.setItem('token', response.data.token);
    
            // Redirect the user to a protected page (e.g., dashboard)
            alert('Login successful!');
            window.location.href = '/Dashboard'; // Replace with your actual route
        } catch (err) {
            // Handle login errors
            setError('Invalid email or password');
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;
