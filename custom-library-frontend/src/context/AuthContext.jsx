import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


// Create the AuthContext
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('AuthContext - Token:', token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('AuthContext - Decoded Token:', decoded);
                setUser({
                    username: decoded.username, // Ensure username is part of user state
                    role: decoded.role, 
                    userID: decoded.userID || decoded.userId,        // Ensure role is part of user state
                });
            } catch (error) {
                console.error('AuthContext - Token Decoding Error:', error);
                localStorage.removeItem('token'); // Clear invalid token
            }
        } else {
            console.log('AuthContext - No token found');
        }

        setLoading(false); // Mark initialization as complete
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator during initialization
    }

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
