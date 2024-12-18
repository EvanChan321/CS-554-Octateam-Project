import Link from 'next/link';

type ListCardProps = {
  id: string;
  title: string;
  description: string;
  gameCount: number;
  averageRating: number;
};

export default function ListCard({
  id,
  title,
  description,
  gameCount,
  averageRating,
    }:
    ListCardProps) {
        return (
            <div className="border rounded-lg shadow-md p-4 bg-white">
            {/* Title */}
            <h3 className="text-lg font-bold mb-2">{title}</h3>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-2">{description}</p>

            {/* Game Count and Rating */}
            <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Games: {gameCount}</span>
                <span>Avg Rating: {averageRating.toFixed(1)} ⭐</span>
            </div>

            {/* View Details Button */}
            <Link href={`/lists/${id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
                </button>
            </Link>
            </div>
        );
        }
