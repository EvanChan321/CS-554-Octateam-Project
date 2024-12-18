import { useState, useEffect } from 'react';

type Game = {
  id: string;
  name: string;
  description: string;
  background_image: string;
  released: string;
};

export default function useFilters() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Fetch games based on filters
  const fetchFilteredGames = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        genre: selectedGenre !== 'All' ? selectedGenre : '',
      });

      const response = await fetch(`/api/games?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setGames(data.games);
      } else {
        throw new Error(data.message || 'Failed to fetch games');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetching games when filters change
  useEffect(() => {
    fetchFilteredGames();
  }, [searchQuery, selectedGenre]);

  return {
    games,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    refetch: fetchFilteredGames,
  };
}
