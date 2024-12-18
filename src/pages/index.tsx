import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filterbar from '@/components/Filterbar';
import GameCard from '@/components/GameCard';

type Game = {
  id: string;
  name: string;
  background_image: string;
  released: string;
  rating: number;
};

interface HomeProps {
  initialGames: Game[];
}

export default function Home({ initialGames }: HomeProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string, genre: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/games/search?query=${query}&genre=${genre}`
      );
      const data = await response.json();

      if (data.success) {
        setGames(data.games);
      } else {
        setError('No games found.');
      }
    } catch (err) {
      setError('Error fetching games. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Discover Your Next Game</h1>
        <Filterbar onSearch={handleSearch} />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.name}
                imageUrl={game.background_image || '/placeholder.jpg'}
                rating={game.rating}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apiKey = process.env.RAWG_API_KEY;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&page_size=10`
    );
    const data = await response.json();

    return {
      props: {
        initialGames: data.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching featured games:', error);
    return {
      props: {
        initialGames: [],
      },
    };
  }
};
