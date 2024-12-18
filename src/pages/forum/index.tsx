import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/Forum.module.css";

export default function ForumList() {
  const [forums, setForums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchForums() {
      const response = await fetch("/api/forum");
      const data = await response.json();
      setForums(data);
    }
    fetchForums();
  }, []);

  const handleCreateForum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, createdBy: "user@example.com" }),
      });
      if (!response.ok) {
        console.error("Failed to create forum");
        return;
      }
      const newForum = await response.json();
      setForums((prevForums) => [...prevForums, newForum]);
      setShowForm(false);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  };

  return (
    <div className={styles.forumContainer}>
      <h1 className={styles.forumTitle}>Forums</h1>
      <ul className={styles.forumList}>
        {forums.map((forum: any) => (
          <li key={forum._id} className={styles.forumItem}>
            <Link href={`/forum/${forum._id}`}>{forum.name}</Link>
          </li>
        ))}
      </ul>

      <button className={styles.formButton} onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create Forum"}
      </button>

      {showForm && (
        <form className={styles.formContainer} onSubmit={handleCreateForum}>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Forum Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className={styles.formTextarea}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className={styles.formButton}>
            Create
          </button>
        </form>
      )}
    </div>
  );
}
