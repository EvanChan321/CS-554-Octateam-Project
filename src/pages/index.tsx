import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Filterbar from '@/components/Filterbar';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import { useUser } from '../context/UserContext';

type Game = {
  gameId: string;
  name: string;
  description: string;
  background_image: string;
  released: string;
  rating: number;
};

export default function Home() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  // Fetch Featured Games
  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        const response = await fetch('/api/games/featured');
        const data = await response.json();
        if (data.success) {
          setFeaturedGames(data.games);
          setFilteredGames(data.games); 
          console.log(featuredGames);
        } else {
          console.error('Failed to load games:', data.message);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedGames();
  }, []);

  const handleAddToList = async (game) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/lists/${user.uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });

      const data = await response.json();
      if (!data.success) {
        console.error('Failed to add game:', data.message);
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  // Handle Search and Filtering
  const handleSearch = async (query: string, genre: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/games/search?query=${query}&genre=${genre}`
      );
      const data = await response.json();
      if (data.success) {
        setFilteredGames(data.games);
      } else {
        console.error('Failed to fetch filtered games:', data.message);
      }
    } catch (error) {
      console.error('Error searching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <section>
          <h1 className="text-3xl font-bold mb-4">Discover Your Next Game</h1>
          <Filterbar onSearch={handleSearch} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Games</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.gameId}
                  id={game.gameId}
                  title={game.name}
                  imageUrl={game.background_image}
                  rating={game.rating}
                  onAddToList={() => handleAddToList(game)}
                /> 
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}