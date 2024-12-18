import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Filterbar from '@/components/Filterbar';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        const response = await fetch('/api/games/featured');
        const data = await response.json();
        if (data.success) {
          setFeaturedGames(data.games);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        {}
        <section>
          <h1 className="text-3xl font-bold mb-4">Discover Your Next Game</h1>
          <Filterbar />
        </section>

        {}
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Games</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredGames.map((game) => (
                <GameCard
                  key={game.gameId}
                  id={game.gameId}
                  title={game.name}
                  imageUrl={game.background_image} 
                  rating={game.rating}
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
