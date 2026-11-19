import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {book.genre?.name || 'Unknown Genre'}
        </span>
      </div>
      <Link 
        to={`/books/${book.id}`} 
        className="mt-4 text-center text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
