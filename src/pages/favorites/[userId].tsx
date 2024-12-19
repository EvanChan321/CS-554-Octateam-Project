import { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function UserFavorites() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (!userId) return;

    const fetchUserFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites/${userId}`);
        const data = await response.json();

        if (data.success) {
            console.log(data)
          const flatFavorites = Array.isArray(data.favorites) ? data.favorites.flat() : [];
          setUserData({ ...data, favorites: flatFavorites });
        } else {
          setError(data.message || 'Failed to fetch user favorites');
        }
      } catch (error) {
        setError('Error fetching user favorites');
        console.error('Error fetching user favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFavorites();
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">My Favorite Games</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : userData?.favorites?.length === 0 ? (
          <p>Your favorites list is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData && userData.favorites?.map((game) => (
              <GameCard
                key={game.gameId}
                id={game.gameId}
                title={game.name}
                imageUrl={game.background_image}
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
