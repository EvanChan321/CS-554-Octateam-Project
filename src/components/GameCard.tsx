import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RatingStars from './RatingStars';
import { useUser } from '../context/UserContext';

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  onAddToList: () => void;
}

export default function GameCard({ id, title, imageUrl, rating, onAddToList }: GameCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAdd = () => {
    onAddToList();
    setIsAdded(true);
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
          <RatingStars rating={rating} />
          <span className="text-gray-800 text-sm font-medium">{rating}/5</span>
        </div>
        <button
          onClick={handleAdd}
          disabled={isAdded}
          className={`mt-4 w-full py-2 rounded-md text-white font-semibold ${isAdded ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isAdded ? 'Added' : 'Add to List'}
        </button>
        <button
          onClick={handleFavorite}
          disabled={isFavorited}
          className={`mt-4 w-full py-2 rounded-md text-white font-semibold ${isFavorited ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'}`}
        >
          {isFavorited ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}
