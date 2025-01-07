import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    console.log('ProtectedRoute - User:', user);
    console.log('ProtectedRoute - Loading:', loading);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while AuthContext initializes
    }

    if (!user) {
        console.log('ProtectedRoute - Redirecting to login');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
