import React from 'react';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Oops! The page you're looking for does not exist.</p>
            <a href="/dashboard">Go Back to dashboard</a>
        </div>
    );
};

export default NotFoundPage;
