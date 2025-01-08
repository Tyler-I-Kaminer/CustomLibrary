import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import './index.css';
import BooksPage from './components/BooksPage';
import UploadPage from './components/UploadPage'
import DownloadHistoryPage from './components/DownloadHistoryPage'
import NotFoundPage from './components/NotFoundPage'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/Dashboard"
                        element={
                            <ProtectedRoute>
                              <div>
                                <Dashboard />
                              </div>
                            </ProtectedRoute>
                        }
                    />
                     <Route path="/books" element={<BooksPage />} />
                     <Route path="/upload" element={<UploadPage />} />
                    <Route path="/download-history" element={<DownloadHistoryPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
