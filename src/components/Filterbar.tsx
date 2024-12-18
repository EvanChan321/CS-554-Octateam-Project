import { useState } from 'react';

type FilterbarProps = {
  onSearch: (query: string, genre: string) => void;
};

const genres = [
  { name: 'All', slug: '' },
  { name: 'Action', slug: 'action' },
  { name: 'Adventure', slug: 'adventure' },
  { name: 'RPG', slug: 'role-playing-games-rpg' },
  { name: 'Shooter', slug: 'shooter' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Puzzle', slug: 'puzzle' },
];

export default function Filterbar({ onSearch }: FilterbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const genreSlug = genres.find((g) => g.name === selectedGenre)?.slug || '';
    onSearch(searchQuery, genreSlug);
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
          <option key={genre.slug} value={genre.name}>
            {genre.name}
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
