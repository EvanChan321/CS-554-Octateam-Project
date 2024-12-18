// Component for displaying individual game details
import { useState } from 'react';
import styles from '../styles/GameCard.module.css';

interface GameCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  description: string;
  releaseDate: string;
  onAddToList: () => void;
}

export default function GameCard({ title, imageUrl, rating, onAddToList }: GameCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToList();
    setIsAdded(true);
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>Rating: {rating} / 10</p>
      <button onClick={handleAdd} disabled={isAdded}>
        {isAdded ? 'Added' : 'Add to List'}
      </button>
    </div>
  );
}
