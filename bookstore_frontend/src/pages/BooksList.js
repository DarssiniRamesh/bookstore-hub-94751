import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGet } from '../api/client';
import './books.css';

// PUBLIC_INTERFACE
export default function BooksList() {
  /** Renders list of books with pagination controls. */
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('limit', String(limit));
      params.set('offset', String(offset));
      if (category) params.set('category', category);
      const data = await apiGet(`/api/books?${params.toString()}`);
      setBooks(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      setError(e.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, offset, category]);

  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  return (
    <div className="container">
      <div className="toolbar">
        <h2>Books</h2>
        <div className="controls">
          <label>
            Category:&nbsp;
            <input
              placeholder="e.g. Software"
              value={category}
              onChange={(e) => {
                setOffset(0);
                setCategory(e.target.value);
              }}
            />
          </label>
          <label>
            Page size:&nbsp;
            <select
              value={limit}
              onChange={(e) => {
                setOffset(0);
                setLimit(Number(e.target.value));
              }}
            >
              {[6, 12, 24].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading && <div className="status">Loading books…</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="grid">
            {books.map((b) => (
              <Link key={b.id} to={`/books/${b.id}`} className="card">
                <img src={b.image_url} alt={b.title} />
                <div className="card-body">
                  <div className="title">{b.title}</div>
                  <div className="author">{b.author}</div>
                  <div className="meta">
                    <span className="price">${b.price.toFixed(2)}</span>
                    <span className="rating">⭐ {b.rating.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button disabled={!canPrev} onClick={() => setOffset(Math.max(0, offset - limit))}>
              ◀ Prev
            </button>
            <span>
              {total === 0 ? '0' : Math.floor(offset / limit) + 1} / {Math.max(1, Math.ceil(total / limit))}
            </span>
            <button disabled={!canNext} onClick={() => setOffset(offset + limit)}>
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
