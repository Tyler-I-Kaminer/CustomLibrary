import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Reuse the Login CSS for the Register page

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
                window.location.href = '/';
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                // Display the backend error message
                setMessage(err.response.data.message);
            } else {
                // Generic error for network or unexpected issues
                setMessage('Error during registration. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="login-form">
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
                <div className="register-box">
                    <p>Already have an account?</p>
                    <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};


export default Register;
