import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import BooksList from './pages/BooksList';
import BookDetails from './pages/BookDetails';

// PUBLIC_INTERFACE
function App() {
  /** Root application with navbar and routes to pages. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #e5e7eb', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 700 }}>Bookstore</Link>
          <Link to="/books" style={{ textDecoration: 'none' }}>Books</Link>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{ marginLeft: 'auto' }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
