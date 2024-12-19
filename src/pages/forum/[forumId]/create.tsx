import { useRouter } from "next/router";
import { useState } from "react";

interface CreateThreadProps {
  forumId: string;
  handleNewThread: (newThread: any) => void; 
}

export default function ({ forumId, handleNewThread }: CreateThreadProps) {
  const router = useRouter();
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
        handleNewThread(await response.json());
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title must be between 3 and 100 characters long."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content must be between 20 and 2000 characters long."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Create Thread
      </button>
    </form>
  );
}
