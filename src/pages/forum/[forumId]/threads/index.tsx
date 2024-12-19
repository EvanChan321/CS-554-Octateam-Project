import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Threads</h1>
      <ul className="space-y-4">
        {threads.map((thread: any) => (
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
    </div>
  );
  
}
