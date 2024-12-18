// Component for displaying lists of games
import GameCard from './GameCard';
import styles from '../styles/GameList.module.css';

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
}

interface GameListProps {
  games: Game[];
  onAddToList: (id: string) => void;
}



export default function GameList({ games, onAddToList }: GameListProps) {
  return (
    <div className={styles.gameList}>
      {games.map((game) => (
        <GameCard
          id={game.id}
          title={game.title}
          imageUrl={game.imageUrl}
          rating={game.rating}
          onAddToList={() => onAddToList(game.id)}
        />
      ))}
    </div>
  );
}
