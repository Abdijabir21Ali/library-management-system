import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

export default function BookGrid({ search, genreId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Build query string
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (genreId) params.append('genreId', genreId);

    axios
      .get(`${import.meta.env.VITE_API_URL}/books?${params.toString()}`)
      .then((res) => {
        // Because of Week 2 pagination, the books are inside res.data.data
        setBooks(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load books. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, genreId]);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading books...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (books.length === 0) return <div className="text-center py-10 text-gray-500">No books found matching your criteria.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
