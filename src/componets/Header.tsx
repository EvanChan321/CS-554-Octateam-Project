// Navigation bar
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/lists">My Lists</Link>
        <Link href="/forum">Forum</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
    </header>
  );
}
