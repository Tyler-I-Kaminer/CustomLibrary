import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../../Assets/file.png';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/Dashboard';
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            {/* Move logo outside the login-box */}
            <img src={logo} alt="Invictus Horizon Logo" className="login-logo" />
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
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
                {error && <p className="error-message">{error}</p>}
            </div>
            <div className="register-box">
                <p>Don't have an account?</p>
                <Link to="/register">Register here</Link>
            </div>
            {/* Add Back to Landing Page button */}
            <button onClick={() => navigate('/')} className="btn back-to-landing">
                    Back to Landing Page
                </button>
        </div>
    );
};

export default Login;
