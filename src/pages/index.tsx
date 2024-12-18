import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filterbar from '@/components/Filterbar';
import GameCard from '@/components/GameCard';

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <section>
          <h1 className="text-3xl font-bold mb-4">Discover Your Next Game</h1>
          <Filterbar />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Featured Games</h2>
          {/* Render game cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Example game cards */}
            <GameCard
              key="1"
              title="Game Title"
              description="Game description here"
              releaseDate="2023-01-01"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
