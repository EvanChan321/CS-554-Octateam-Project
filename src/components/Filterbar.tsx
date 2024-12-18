import { useState } from 'react';

type FilterbarProps = {
  onSearch: (query: string, genre: string) => void;
};

const genres = ['All', 'Action', 'Adventure', 'RPG', 'Shooter', 'Sports', 'Puzzle'];

export default function Filterbar({ onSearch }: FilterbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedGenre);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 p-4 rounded shadow"
    >
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full md:w-1/2"
      />

      {/* Genre Dropdown */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="border p-2 rounded w-full md:w-1/4"
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
