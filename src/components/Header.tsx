import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Store the user ID

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/api/check-session');
        if (res.status === 200 && res.data.loggedIn) {
          setIsLoggedIn(true);
          setUserId(res.data.userId); // Set user ID if logged in
          console.log(res.data.userId);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false); 
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setIsLoggedIn(false); 
      setUserId(null); // Clear user ID on logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
      </Head>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex space-x-6 centered">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/games" className="text-white hover:text-gray-300">
              Games
            </Link>
            {isLoggedIn && (
              <Link href="/lists" className="text-white hover:text-gray-300">
                My Lists
              </Link>
            )}
            <Link href="/forum" className="text-white hover:text-gray-300">
              Forum
            </Link>
            {isLoggedIn && userId && (
              <Link href={`/user/${userId}`} className="text-white hover:text-gray-300">
                My Profile
              </Link>
            )}
          </div>
          <div className="">
            <h1 className="font-bold text-3xl font-pixel">Game Share</h1>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
              >
                Logout
              </button>
            ) : (
              <div className="space-x-6">
                <Link
                  href="/auth/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
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
