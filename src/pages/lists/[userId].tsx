import { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function UserLists() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userId } = router.query; 

  useEffect(() => {
    if (!userId) return;

    const fetchUserGames = async () => {
      try {
        const response = await fetch(`/api/lists/${userId}`);
        const data = await response.json();

        if (data.success) {
          console.log(data)
          const flatGamesList = Array.isArray(data.gamesList) ? data.gamesList.flat() : [];
          setUserData({ ...data, gamesList: flatGamesList });
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
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">My Games List</h1>

        {loading ? (
          <p>Loading...</p>
        ) : userData?.gamesList.length === 0 ? (
          <p>Your list is empty. Start adding games!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.gamesList.map((game) => (
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
