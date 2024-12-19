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
          setUserData(response.data.user); 
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
    <div className="flex flex-col min-h-screen">
          <Header />
    <div className="profile">
      <h1>{userData.email}</h1>
      <h2>Favorite Games:</h2>
      <ul>
        {userData.favoriteGames.length === 0 ? (
          <li>No favorite games</li>
        ) : (
          userData.favoriteGames.map((game: string, index: number) => (
            <li key={index}>{game}</li>
          ))
        )}
      </ul>

      <h2>Reviews:</h2>
      <ul>
        {userData.reviews.length === 0 ? (
          <li>No reviews</li>
        ) : (
          userData.reviews.map((review: string, index: number) => (
            <li key={index}>{review}</li>
          ))
        )}
      </ul>

      <h2>Games List:</h2>
      <ul>
        {userData.gamesList.length === 0 ? (
          <li>No games in list</li>
        ) : (
          userData.gamesList.map((game: string, index: number) => (
            <li key={index}>{game}</li>
          ))
        )}
      </ul>

      <h2>Forums List:</h2>
      <ul>
        {userData.forumsList.length === 0 ? (
          <li>No forums in list</li>
        ) : (
          userData.forumsList.map((forum: string, index: number) => (
            <li key={index}>{forum}</li>
          ))
        )}
      </ul>
    </div>
    </div>
  );
};

export default UserProfile;
