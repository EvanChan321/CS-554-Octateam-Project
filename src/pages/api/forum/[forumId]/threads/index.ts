import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId } = req.query;
  const collection = await forumPosts();

  if (req.method === "POST") {
    const { title, content, createdBy } = req.body;

    if (!title || !content || !createdBy) {
      return res.status(400).json({ message: 'Title, content, and createdBy are required.' });
    }
  
    // Ensure all fields are strings
    if (
      typeof title !== 'string' || 
      typeof content !== 'string' || 
      typeof createdBy !== 'string'
    ) {
      return res.status(400).json({ message: 'All fields must be strings.' });
    }
  
    // Trim inputs
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCreatedBy = createdBy.trim();
  
    // Validate title length (e.g., between 3 and 100 characters)
    if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      return res.status(400).json({ message: 'Title must be between 3 and 100 characters long.' });
    }
  
    // Validate content length (e.g., between 20 and 2000 characters)
    if (trimmedContent.length < 20 || trimmedContent.length > 2000) {
      return res.status(400).json({ message: 'Content must be between 20 and 2000 characters long.' });
    }
  

    const thread = {
      _id: new ObjectId(),
      title: trimmedTitle,
      content: trimmedContent,
      createdAt: new Date(),
      createdBy: trimmedCreatedBy,
      comments: [],
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(forumId as string) },
      { $push: { threads: thread } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Forum not found" });
    }

    return res.status(201).json(thread);
  }

  if (req.method === "GET") {
    const forum = await collection.findOne({ _id: new ObjectId(forumId as string) });

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    return res.status(200).json(forum.threads);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
