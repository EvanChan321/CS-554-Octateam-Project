import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userId } = router.query; 

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/user/${userId}`);
          setUserData(response.data.user); // Set user data in the state
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data');
        }
      };
      fetchUserData();
    }
  }, [userId]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!userData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 bg-white rounded-lg shadow-md text-center mt-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{userData.email}</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Favorite Games:</h2>
          <ul className="space-y-2">
            {userData.favoriteGames.length === 0 ? (
              <li className="text-gray-500">No favorite games</li>
            ) : (
              userData.favoriteGames.map((game: string, index: number) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm text-gray-700">
                  {game}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Reviews:</h2>
          <ul className="space-y-2">
            {userData.reviews.length === 0 ? (
              <li className="text-gray-500">No reviews</li>
            ) : (
              userData.reviews.map((review: string, index: number) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm text-gray-700">
                  {review}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Games List:</h2>
          <ul className="space-y-2">
            {userData.gamesList.length === 0 ? (
              <li className="text-gray-500">No games in list</li>
            ) : (
              userData.gamesList.map((game: string, index: number) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm text-gray-700">
                  {game}
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Forums List:</h2>
          <ul className="space-y-2">
            {userData.forumsList.length === 0 ? (
              <li className="text-gray-500">No forums in list</li>
            ) : (
              userData.forumsList.map((forum: string, index: number) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm text-gray-700">
                  {forum}
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
