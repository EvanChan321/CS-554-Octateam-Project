// Component for displaying individual game details
import { useState } from 'react';
import styles from '../styles/GameCard.module.css';
import Link from 'next/link';

interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  onAddToList: () => void;
}

export default function GameCard({id, title, imageUrl, rating, onAddToList }: GameCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToList();
    setIsAdded(true);

    console.log(id, title, imageUrl, rating)
  }; 
  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageUrl} alt={title} />
      <h3>
        <Link href={`/games/${id}`}>{title}</Link>
      </h3>
      <p>Rating: {rating}/5</p>
      <button onClick={handleAdd} disabled={isAdded}>
        {isAdded ? 'Added' : 'Add to List'}
      </button>
    </div>
  );
}
