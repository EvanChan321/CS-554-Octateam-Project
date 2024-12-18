import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Forum.module.css";

export default function ThreadDetails() {
  const router = useRouter();
  const { forumId, threadId } = router.query;
  const [thread, setThread] = useState<any>(null);

  useEffect(() => {
    if (forumId && threadId) {
      async function fetchThread() {
        const response = await fetch(`/api/forum/${forumId}/threads/${threadId}`);
        const data = await response.json();
        setThread(data);
      }
      fetchThread();
    }
  }, [forumId, threadId]);

  if (!thread) return <p>Loading...</p>;

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.threadTitle}>{thread.title}</h1>
      <p className={styles.threadContent}>{thread.content}</p>
    </div>
  );
}
