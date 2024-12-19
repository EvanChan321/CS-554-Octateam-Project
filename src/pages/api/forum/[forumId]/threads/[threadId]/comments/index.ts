import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId, threadId } = req.query;
  const collection = await forumPosts();

  if (req.method === "GET") {
    try {
      const forum = await collection.findOne({ _id: new ObjectId(forumId as string) });

      if (!forum) {
        return res.status(404).json({ message: "Forum not found" });
      }

      const thread = forum.threads.find(
        (t: any) => t._id.toString() === threadId
      );

      if (!thread) {
        return res.status(404).json({ message: "Thread not found" });
      }

      return res.status(200).json(thread.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    const { content, createdBy, parentCommentId } = req.body;

    if (!content || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const comment = {
      _id: new ObjectId(),
      content,
      parentCommentId: parentCommentId ? new ObjectId(parentCommentId) : null,
      createdAt: new Date(),
      createdBy,
    };

    const result = await collection.updateOne(
      {
        _id: new ObjectId(forumId as string),
        "threads._id": new ObjectId(threadId as string),
      },
      { $push: { "threads.$.comments": comment } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(201).json(comment);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
