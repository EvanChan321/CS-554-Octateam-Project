import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import CreateThread from "./create";
import Header from "@/components/Header";

export default function ForumDetails() {
  const router = useRouter();
  const { forumId } = router.query;
  const [forum, setForum] = useState<any>(null);
  const [modal, setModal] = useState(false);

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

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleNewThread = (newThread: any) => {
    setForum((prevForum: any) => ({
      ...prevForum,
      threads: [...prevForum.threads, newThread],
    }));
    setModal(false);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{forum.name}</h1>
        <p className="text-lg text-gray-600 mb-6">{forum.description}</p>
        <ul className="space-y-4">
          {forum.threads.map((thread: any) => (
            <li key={thread._id} className="border-b pb-4">
              <Link
                href={`/forum/${forumId}/threads/${thread._id}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-800"
              >
                {thread.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleModal}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            {modal ? "Close" : "Create a new Thread"}
          </button>
        </div>
        {modal && (
          <CreateThread
            forumId={forumId}
            handleNewThread={handleNewThread}
          />
        )}
      </div>
    </>
  );
}
