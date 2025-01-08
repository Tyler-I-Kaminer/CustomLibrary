import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext';
import '../Dashboard.css'; // Custom CSS for styling the dashboard
import logo from '../Assets/file.png'; // Add the logo to your assets folder
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate(); // Initialize navigate
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    const filteredBooks = books.filter(
        (book) =>
            (book.Title || '').toLowerCase().includes(search.toLowerCase()) ||
            (book.Author || '').toLowerCase().includes(search.toLowerCase())
    );

    const handleLogout = () => {
        logout(); // Clear user session
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books'); // Adjust URL as needed
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Unable to fetch books. Please try again later.');
            }
        };

        fetchBooks();
    // Auto-scroll functionality
    const interval = setInterval(() => {
        document.querySelector('.books-grid').scrollBy(0, 1);
    }, 25); // Adjust speed as needed
    return () => clearInterval(interval); // Clean up on unmount
    }, []);

    return (
        <div className="dashboard-container">
            <img src={logo} alt="Invictus Horizon Logo" className="dashboard-logo" />
            <h1>Welcome {user?.username || 'Guest'} to the Invictus Horizon Library</h1>
            <p>Your role: {user?.role || 'unknown'}</p>
            <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-bar"
            />
            <h1 
                onClick={() => navigate('/books')} 
                className="library-link">
                Library Collection
            </h1>
            
            {error && <p className="error">{error}</p>}
        <div className="books-grid">
            {filteredBooks.map((book) => (
                <div className="book-card" key={book.BookID}>
                    <h3>{book.Title}</h3>
                            <p>Author: {book.Author || 'Unknown'}</p>
                            <p>Series: {book.Series || 'N/A'}</p>
                            <p>Genre: {book.Genre || 'Unknown'}</p>
                            <p>Format: {book.Format || 'N/A'}</p>
                </div>
            ))}
        </div>
        <button onClick={handleLogout}>Logout</button>
    </div>
);
};

export default Dashboard;
