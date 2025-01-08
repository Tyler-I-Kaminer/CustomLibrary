import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BooksPage.css';

const BooksPage = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const filteredBooks = books.filter(
        (book) =>
            (book.Title || '').toLowerCase().includes(search.toLowerCase()) ||
            (book.Author || '').toLowerCase().includes(search.toLowerCase()) ||
            (book.Genre || '').toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/books');
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching books:', err);
                setError('Unable to fetch books. Please try again later.');
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="books-page">
            <header className="navbar">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar"
                />
                <button onClick={() => navigate('/upload')} className="navbar-button">
                    Upload
                </button>
                <button onClick={() => navigate('/download-history')} className="navbar-button">
                    Download History
                </button>
                <button onClick={() => navigate('/dashboard')} className="navbar-button">
                    Back to Dashboard
                </button>
            </header>

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
        </div>
    );
};

export default BooksPage;
