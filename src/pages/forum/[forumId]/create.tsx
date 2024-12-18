import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Forum.module.css";

export default function CreateThread() {
  const router = useRouter();
  const { forumId } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/forum/${forumId}/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, createdBy: "user@example.com" }),
      });

      if (response.ok) {
        router.push(`/forum/${forumId}`);
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumTitle}>Create a Thread</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={styles.formTextarea}
          placeholder="Thread Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className={styles.formButton} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
