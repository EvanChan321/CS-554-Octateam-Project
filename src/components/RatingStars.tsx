// User ratings component
interface RatingStarsProps {
    rating: number;
  }
  
  export default function RatingStars({ rating }: RatingStarsProps) {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));
  
    return (
      <div>
        {stars.map((filled, idx) => (
          <span key={idx}>{filled ? '⭐' : '☆'}</span>
        ))}
      </div>
    );
  }
  