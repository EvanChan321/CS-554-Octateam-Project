import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-6 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{game.name}</h1>
        <div className="relative w-full h-64 mb-6">
          <Image
            src={game.background_image}
            alt={game.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="text-gray-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between mt-4 text-2xl">
            <p className="font-semibold">
              <span className="text-gray-900">Released:</span> {game.released}
            </p>
            <p className="font-semibold">
              <span className="text-gray-900">Rating:</span> {game.rating}/5
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between text-2xl">
            <p className="font-semibold">
              <span className="text-gray-900">Rating Count:</span> {game.ratings_count}
            </p>
            <p className="font-semibold">
              <span className="text-gray-900">ESRB Rating:</span> {game.esrb_rating || "Not Rated"}
            </p>
          </div>
          <p className="text-lg">{game.description}</p>
          <div className="mt-4">
            <Link
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold underline text-blue-500"
            >
              Visit Website
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}