// Navigation bar
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import Head from 'next/head';

export default function Header() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet"/>
      </Head>
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex space-x-6 centered">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/games" className="text-white hover:text-gray-300">Games</Link>
          {user && <Link href="/lists" className="text-white hover:text-gray-300">My Lists</Link>}
          <Link href="/forum" className="text-white hover:text-gray-300">Forum</Link>
        </div>
        <div className=''>
          <h1 className='font-bold text-3xl font-pixel'>Game Share</h1>
        </div>
        <div>
          {user ? (
            <button onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-6">
              <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200">
                Login
              </Link>
              <Link href="/auth/signup" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200">
                Signup
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
    </>
  );
}
