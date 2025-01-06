import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    // Define styles before return
    const styles = {
        button: {
            padding: '10px 20px',
            backgroundColor: '#ff4d4d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <h1>Welcome, {user?.username || 'User'}</h1>
            <p>Your role: {user?.role || 'unknown'}</p>
            <button onClick={logout} style={styles.button}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
