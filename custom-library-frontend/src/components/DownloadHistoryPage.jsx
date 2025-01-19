import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DownloadHistoryPage = () => {
    const { user } = useAuth();
    console.log('AuthContext user:', user);
    const [downloadHistory, setDownloadHistory] = useState([]);
    const [currentPage] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(''); // Default is blank
    const navigate = useNavigate();

    const isAdmin = user?.role === 'admin';
    const limit = 10;

    // Fetch all users for admin dropdown
    useEffect(() => {
        if (isAdmin) {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/users', {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    });
                    setUsers(response.data);
                } catch (err) {
                    console.error('Error fetching users:', err);
                }
            };
            fetchUsers();
        }
    }, [isAdmin]);

    // Fetch download history based on user selection
    useEffect(() => {
        const fetchDownloadHistory = async () => {
            setLoading(true);

            // Determine which userID to fetch
            const userIDToFetch = selectedUser || user?.userID;
            console.log('Fetching download history for userID:', userIDToFetch);

            if (!userIDToFetch) {
                console.error('No userID available.');
                setError('Unable to fetch download history: Missing userID.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:3000/download-history?page=${currentPage}&limit=${limit}&userID=${userIDToFetch}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                );
                setDownloadHistory(response.data);
                setError(''); // Clear previous errors
            } catch (err) {
                console.error('Error fetching download history:', err);
                setError('Unable to fetch download history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDownloadHistory();
    }, [currentPage, selectedUser, user]);

    return (
        <div className="download-history-page">
            <header className="navbar">
                <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                <button onClick={() => navigate('/books')}>Back to Library Collection</button>
                <button onClick={() => navigate('/')}>Logout</button>
            </header>
            <h1>Download History</h1>

            {isAdmin && (
                <div className="admin-controls">
                    <label htmlFor="user-select">View history for:</label>
                    <select
                        id="user-select"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">My History</option>
                        {users.map((userItem) => (
                            <option key={userItem.userID} value={userItem.userID}>
                                {userItem.Username} {/* Display username but use userID as value */}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="history-grid">
                {downloadHistory.length > 0 ? (
                    downloadHistory.map((entry) => (
                        <div key={entry.DownloadID} className="history-card">
                            <h3>{entry.BookTitle}</h3>
                            <p>Format: {entry.Format}</p>
                            <p>Date: {new Date(entry.DownloadDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No download history available.</p>
                )}
            </div>
        </div>
    );
};

export default DownloadHistoryPage;