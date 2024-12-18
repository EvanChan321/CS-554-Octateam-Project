import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId, threadId } = req.query;
  const collection = await forumPosts();

  if (req.method === "GET") {
    // Fetch a specific thread
    const forum = await collection.findOne(
      { _id: new ObjectId(forumId as string) },
      { projection: { threads: 1 } }
    );

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    const thread = forum.threads.find((t) => t._id.equals(new ObjectId(threadId as string)));

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(200).json(thread);
  }

  if (req.method === "PATCH") {
    // Update a specific thread
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updates: { [key: string]: string } = {};
    if (title) updates["threads.$.title"] = title;
    if (content) updates["threads.$.content"] = content;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(forumId as string),
        "threads._id": new ObjectId(threadId as string),
      },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(200).json({ message: "Thread updated successfully" });
  }

  if (req.method === "DELETE") {
    // Delete a specific thread
    const result = await collection.updateOne(
      { _id: new ObjectId(forumId as string) },
      { $pull: { threads: { _id: new ObjectId(threadId as string) } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }

    return res.status(200).json({ message: "Thread deleted successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
