import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        setError('Book not found.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading details...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!book) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Catalog</Link>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
      <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
      
      <div className="flex gap-4 mb-6">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold">
          {book.genre?.name}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold">
          {book.availableCopies} Available
        </span>
      </div>

      <div className="border-t pt-4 text-gray-700">
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Total Copies:</strong> {book.totalCopies}</p>
      </div>
    </div>
  );
}
