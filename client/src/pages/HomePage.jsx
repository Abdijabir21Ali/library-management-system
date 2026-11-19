import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genres, setGenres] = useState([]);

  // Fetch genres for the filter dropdown
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/genres`)
      .then((res) => setGenres(res.data))
      .catch((err) => console.error("Failed to load genres", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Library Catalog</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar onSearch={setSearch} />
        </div>
        <div className="w-full md:w-64">
          <select
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      <BookGrid search={search} genreId={genreId} />
    </div>
  );
}
