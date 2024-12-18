import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId, threadId, commentId } = req.query;
  const collection = await forumPosts();

  if (req.method === "GET") {
    // Fetch specific comment
    const forum = await collection.findOne(
      {
        _id: new ObjectId(forumId as string),
        "threads._id": new ObjectId(threadId as string),
        "threads.comments._id": new ObjectId(commentId as string),
      },
      { projection: { "threads.$": 1 } }
    );

    if (!forum) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const thread = forum.threads.find((t) => t._id.equals(new ObjectId(threadId as string)));
    const comment = thread?.comments.find((c) => c._id.equals(new ObjectId(commentId as string)));

    return res.status(200).json(comment);
  }

  if (req.method === "PATCH") {
    // Update specific comment
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const result = await collection.updateOne(
      {
        _id: new ObjectId(forumId as string),
        "threads._id": new ObjectId(threadId as string),
        "threads.comments._id": new ObjectId(commentId as string),
      },
      { $set: { "threads.$[thread].comments.$[comment].content": content } },
      {
        arrayFilters: [
          { "thread._id": new ObjectId(threadId as string) },
          { "comment._id": new ObjectId(commentId as string) },
        ],
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment updated successfully" });
  }

  if (req.method === "DELETE") {
    // Delete specific comment
    const result = await collection.updateOne(
      {
        _id: new ObjectId(forumId as string),
        "threads._id": new ObjectId(threadId as string),
      },
      { $pull: { "threads.$.comments": { _id: new ObjectId(commentId as string) } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
