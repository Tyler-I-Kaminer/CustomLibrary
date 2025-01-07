import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext';
import '../Dashboard.css'; // Custom CSS for styling the dashboard
import logo from '../Assets/file.png'; // Add the logo to your assets folder

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = () => {
        logout(); // Clear user session
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="dashboard-container">
            <img src={logo} alt="Invictus Horizon Logo" className="dashboard-logo" />
            <h1>Welcome, {user?.username || 'Guest'}, to the Invictus Horizon Library</h1>
            <p>Your role: {user?.role || 'unknown'}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
