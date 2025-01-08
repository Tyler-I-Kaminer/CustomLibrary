import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BooksPage.css';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books');
                setBooks(response.data);
                setFilteredBooks(response.data); // Set initial filtered books
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Unable to fetch books. Please try again later.');
            }
        };

        fetchBooks();
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = books.filter((book) =>
            book.Title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            book.Author?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            book.Genre?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    return (
        <div className="books-page">
            <div className="header">
                <button onClick={() => navigate('/dashboard')} className="nav-button">Go Back to Dashboard</button>
                <button onClick={() => navigate('/')} className="nav-button">Logout</button>
            </div>
            <h1>Books</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by title, author, or genre..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="actions">
                <button onClick={() => alert('View Download History')}>View Download History</button>
                <button onClick={() => alert('Upload Books')}>Upload Books</button>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="books-grid">
                {filteredBooks.map((book) => (
                    <div className="book-card" key={book.BookID}>
                        <img
                            src={book.CoverImageURL || 'https://via.placeholder.com/150'}
                            alt={book.Title}
                            className="book-cover"
                        />
                        <div className="book-details">
                            <h3>{book.Title}</h3>
                            <p>Author: {book.Author || 'Unknown'}</p>
                            <p>Series: {book.Series || 'N/A'}</p>
                            <p>Genre: {book.Genre || 'Unknown'}</p>
                            <p>Format: {book.Format || 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
