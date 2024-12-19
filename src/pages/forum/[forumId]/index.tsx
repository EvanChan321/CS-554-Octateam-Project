import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forum.module.css";

export default function ForumDetails() {
  const router = useRouter();
  const { forumId } = router.query;
  const [forum, setForum] = useState<any>(null);

  useEffect(() => {
    if (forumId) {
      async function fetchForum() {
        const response = await fetch(`/api/forum/${forumId}`);
        const data = await response.json();
        setForum(data);
      }
      fetchForum();
    }
  }, [forumId]);

  if (!forum) return <p>Loading...</p>;

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumTitle}>{forum.name}</h1>
      <p className={styles.forumDescription}>{forum.description}</p>
      <ul className={styles.threadList}>
        {forum.threads.map((thread: any) => (
          <li key={thread._id} className={styles.threadItem}>
            <Link href={`/forum/${forumId}/threads/${thread._id}`}>
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`/forum/${forumId}/create`}>
        Create a New Thread
      </Link>
    </div>
  );
}
