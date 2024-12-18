import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

type Game = {
  gameId: string;
  name: string;
  description: string;
  background_image: string;
  released: string;
  rating: number;
  website: string;
  ratings_count: number;
  esrb_rating: string;
};

export default function GamesDetails() {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;


  const fetchGame = async (id: string) => {
    try {
      const response = await fetch(`/api/games/${id}`);
      const data = await response.json();
      if (data.success) {
        setGame(data.game);
      } else {
        console.error('Failed to load games:', data.message);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGame(id as string); 
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold">{game.name}</h1>
        <img src={game.background_image} alt={game.name} className="w-full h-auto" />
        <p>{game.description}</p>
        <p>Released: {game.released}</p>
        <p>Rating: {game.rating}/5</p>
        <p>Rating Count: {game.ratings_count}</p>
        <p>ESRB Rating: {game.esrb_rating}</p>
        <a href={game.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </main>
      <Footer />
    </div>
  );
}