import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ThreadDetails() {
  const router = useRouter();
  const { forumId, threadId } = router.query;
  const [thread, setThread] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/forum/${forumId}/threads/${threadId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          createdBy: "user@example.com", // Replace with actual user info
        }),
      });

      if (response.ok) {
        const postedComment = await response.json();
        setComments((prevComments) => [...prevComments, postedComment]);
        setNewComment(""); // Clear the input field
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!thread) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-9">{thread.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{thread.content}</p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment._id} className="border-b pb-4">
                <p className="text-sm text-gray-500 font-bold">{comment.createdBy}</p>
                <p className="text-gray-700">{comment.content}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className={`mt-3 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </>
  );
}
