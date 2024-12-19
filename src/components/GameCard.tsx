import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  onAddToList: () => void;
  isFavorite: boolean; // Pass whether the game is favorited
}

export default function GameCard({ id, title, imageUrl, rating, onAddToList, isFavorite }: GameCardProps) {
  const [isFavorited, setIsFavorited] = useState(isFavorite); // Initialize with the passed value

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const response = await fetch(`/api/favorites/${id}`); // Check if this specific game is in favorites
        const data = await response.json();

        if (data.success && data.favorites.some((game: any) => game.gameId === id)) {
          setIsFavorited(true); // Game is in favorites
        } else {
          setIsFavorited(false); // Game is not in favorites
        }
      } catch (error) {
        console.error('Error checking if game is favorited:', error);
        setIsFavorited(false);
      }
    };

    checkIfFavorited();
  }, [id]); // Re-run effect when the game id changes

  const handleAdd = () => {
    onAddToList();
    console.log(id, title, imageUrl, rating);
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: id }),
      });

      const data = await response.json();
      if (data.success) {
        setIsFavorited(true);
        alert('Game added to favorites!');
      } else {
        alert('Failed to add to favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Error adding to favorites');
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: id }),
      });

      const data = await response.json();
      if (data.success) {
        setIsFavorited(false);
        alert('Game removed from favorites!');
      } else {
        alert('Failed to remove from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Error removing from favorites');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-xl">
      <Image
        className="w-full h-50 object-cover"
        src={imageUrl}
        width={200}
        height={300}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          <Link href={`/games/${id}`} className="hover:text-blue-500">
            {title}
          </Link>
        </h3>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-gray-800 text-sm font-medium">{rating}/5</span>
        </div>
        {isFavorited ? (
          <button
            onClick={handleRemoveFavorite}
            className="mt-4 w-full py-2 rounded-md text-white font-semibold bg-red-500 hover:bg-red-600"
          >
            Remove from Favorites
          </button>
        ) : (
          <button
            onClick={handleFavorite}
            disabled={isFavorited}
            className={`mt-4 w-full py-2 rounded-md text-white font-semibold ${isFavorited ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'}`}
          >
            {isFavorited ? 'Favorited' : 'Add to Favorites'}
          </button>
        )}
      </div>
    </div>
  );
}
