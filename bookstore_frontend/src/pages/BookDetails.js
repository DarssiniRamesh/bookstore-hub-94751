import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import './books.css';

// PUBLIC_INTERFACE
export default function BookDetails() {
  /** Renders detailed information for a single book. */
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    apiGet(`/api/books/${id}`)
      .then((data) => {
        if (active) setBook(data);
      })
      .catch((e) => setError(e.message || 'Failed to load book'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <div className="container"><div className="status">Loading book…</div></div>;
  if (error) return <div className="container"><div className="status error">Error: {error}</div></div>;
  if (!book) return <div className="container"><div className="status">Not found</div></div>;

  return (
    <div className="container">
      <Link to="/books" className="back-link">← Back to Books</Link>
      <div className="details">
        <img src={book.image_url} alt={book.title} />
        <div className="info">
          <h2>{book.title}</h2>
          <div className="author">{book.author}</div>
          <div className="category">Category: {book.category}</div>
          <div className="rating">⭐ {book.rating.toFixed(1)}</div>
          <div className="price">${book.price.toFixed(2)}</div>
          <p className="description">{book.description}</p>
        </div>
      </div>
    </div>
  );
}
