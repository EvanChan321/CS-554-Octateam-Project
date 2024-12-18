// Navigation bar
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import styles from '../styles/Header.module.css';

export default function Header() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/lists">My Lists</Link>
        <Link href="/forum">Forum</Link>
        {user ? (
          <Link href="/auth/login" onClick={handleLogout} className={styles.logoutLink}>
            Logout
          </Link>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
