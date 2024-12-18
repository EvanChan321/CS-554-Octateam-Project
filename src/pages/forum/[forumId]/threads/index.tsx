import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forum.module.css";

export default function ThreadList() {
  const router = useRouter();
  const { forumId } = router.query;
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    if (forumId) {
      async function fetchThreads() {
        const response = await fetch(`/api/forum/${forumId}/threads`);
        const data = await response.json();
        setThreads(data);
      }
      fetchThreads();
    }
  }, [forumId]);

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumTitle}>Threads</h1>
      <ul className={styles.threadList}>
        {threads.map((thread: any) => (
          <li key={thread._id} className={styles.threadItem}>
            <Link href={`/forum/${forumId}/threads/${thread._id}`}>
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
