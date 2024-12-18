import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ThreadDetails() {
  const router = useRouter();
  const { forumId, threadId } = router.query;
  const [thread, setThread] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (forumId && threadId) {
      async function fetchThreadAndComments() {
        try {
          const threadResponse = await fetch(`/api/forum/${forumId}/threads/${threadId}`);
          const threadData = await threadResponse.json();
          setThread(threadData);

          const commentsResponse = await fetch(`/api/forum/${forumId}/threads/${threadId}/comments`);
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        } catch (error) {
          console.error("Error fetching thread or comments:", error);
        }
      }
      fetchThreadAndComments();
    }
  }, [forumId, threadId]);

  if (!thread) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{thread.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{thread.content}</p>

      <h2 className="text-1xl font-bold text-gray-800 mb-4">Comments</h2>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="border-b pb-4">
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500">By: {comment.createdBy}</p>
              <p className="text-sm text-gray-500">At: {new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No comments yet.</p>
      )}
    </div>
  );
}
