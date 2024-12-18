import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Forum.module.css";

export default function AddComment() {
  const router = useRouter();
  const { forumId, threadId } = router.query;

  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/forum/${forumId}/threads/${threadId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, createdBy: "user@example.com" }),
        }
      );

      if (response.ok) {
        router.push(`/forum/${forumId}/threads/${threadId}`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumTitle}>Add a Comment</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <textarea
          className={styles.formTextarea}
          placeholder="Comment Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className={styles.formButton} type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
}
