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

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
  
    // Ensure both fields are strings
    if (typeof title !== 'string' || typeof content !== 'string') {
      return res.status(400).json({ message: 'Title and content must be strings.' });
    }
  
    // Trim inputs
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
  
    // Validate title length (e.g., between 3 and 100 characters)
    if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      return res.status(400).json({ message: 'Title must be between 3 and 100 characters long.' });
    }
  
    // Validate content length (e.g., between 20 and 2000 characters)
    if (trimmedContent.length < 20 || trimmedContent.length > 2000) {
      return res.status(400).json({ message: 'Content must be between 20 and 2000 characters long.' });
    }

    const updates: { [key: string]: string } = {};
    if (trimmedTitle) updates["threads.$.title"] = trimmedTitle;
    if (trimmedContent) updates["threads.$.content"] = trimmedContent;

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
