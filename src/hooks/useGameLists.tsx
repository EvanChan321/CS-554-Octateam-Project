import { useState, useEffect } from 'react';

type GameList = {
  id: string;
  title: string;
  description: string;
  games: { id: string; name: string; rating: number }[];
  createdAt: string;
};

export default function useGameLists() {
  const [gameLists, setGameLists] = useState<GameList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all game lists
  const fetchGameLists = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/lists');
      const data = await response.json();

      if (data.success) {
        setGameLists(data.lists);
      } else {
        throw new Error(data.message || 'Failed to fetch lists');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new game list
  const addGameList = async (newList: { title: string; description: string }) => {
    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newList),
      });
      const data = await response.json();

      if (data.success) {
        fetchGameLists(); // Refresh the list
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Initial fetch when the hook is mounted
  useEffect(() => {
    fetchGameLists();
  }, []);

  return {
    gameLists,
    loading,
    error,
    addGameList,
    refetch: fetchGameLists,
  };
}
