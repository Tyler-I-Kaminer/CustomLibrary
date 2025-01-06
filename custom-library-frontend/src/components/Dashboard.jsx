import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../Dashboard.css'; // Custom CSS for styling the dashboard
import logo from '../Assets/InvictusHorizonLogo.png'; // Add the logo to your assets folder

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard-container">
            <img src={logo} alt="Invictus Horizon Logo" className="dashboard-logo" />
            <h1>Welcome, {user?.username || 'Guest'}, to the Invictus Horizon Library</h1>
            <p>Your role: {user?.role || 'unknown'}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
