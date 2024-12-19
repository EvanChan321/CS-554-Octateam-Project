// Page showing user's lists

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UserLists() {
  const { user } = useUser();
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    
    const fetchUserGames = async () => {
      try {
        const response = await fetch(`/api/lists/${user.uid}`);
        const data = await response.json();

        if (data.success) {
          setUserGames(data.games);
        } else {
          console.error('Failed to fetch user games:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGames();
  }, [user]);

  console.log("asdadadaldnlasndadasndsd")
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">My Games List</h1>

        {loading ? (
          <p>Loading...</p>
        ) : userGames.length === 0 ? (
          <p>Your list is empty. Start adding games!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userGames.map((game) => (
              <GameCard
                key={game.gameId}
                id={game.gameId}
                title={game.title}
                imageUrl={game.imageUrl}
                rating={game.rating}
                onAddToList={() => {}}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
