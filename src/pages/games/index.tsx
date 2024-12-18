import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

type Game = {
  gameId: string;
  name: string;
  description: string;
  background_image: string;
  released: string;
  rating: number;
};

export default function GamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchGames = async (page: number) => {
    try {
      const response = await fetch(`/api/games/gamesList?page=${page}`);
      const data = await response.json();
      if (data.success) {
        setGames(data.games);
      } else {
        console.error('Failed to load games:', data.message);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change and fetch new games
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    fetchGames(newPage);
    router.push(`/games?page=${newPage}`); 
  };


  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage]); 

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <section>
          <h1 className="text-3xl font-bold mb-4">All Games</h1>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Browse Games</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {games.map((game) => (
                <GameCard
                  key={game.gameId}
                  id={game.gameId}
                  title={game.name}
                  imageUrl={game.background_image}
                  rating={game.rating}
                  onAddToList={() => console.log(`${game.name} added to list`)}
                />
              ))}
            </div>
          )}
        </section>
        
        <section>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
