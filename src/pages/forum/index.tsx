import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

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
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <Header />

      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">Forums</h1>

      <ul className="space-y-4">
        {forums.map((forum: any) => (
          <li key={forum._id} className="bg-white shadow rounded-md p-4 hover:bg-gray-50 transition duration-200">
            <Link href={`/forum/${forum._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {forum.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          className={`${
            showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-6 py-2 rounded-md transition duration-200`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Forum'}
        </button>
      </div>

      {showForm && (
        <form
          className="mt-6 bg-white shadow-md rounded-md p-6 space-y-4"
          onSubmit={handleCreateForum}
        >
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Forum Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition duration-200"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
