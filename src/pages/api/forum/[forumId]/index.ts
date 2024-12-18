import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId } = req.query;
  const collection = await forumPosts();

  if (req.method === "GET") {
    // Fetch forum details
    const forum = await collection.findOne({ _id: new ObjectId(forumId as string) });

    if (!forum) {
      return res.status(404).json({ message: "Forum not found" });
    }

    return res.status(200).json(forum);
  }

  if (req.method === "PATCH") {
    // Update forum details
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }
  
    // Ensure both fields are strings
    if (typeof name !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ message: 'Name and description must be strings.' });
    }
  
    // Trim inputs
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
  
    // Validate name length (e.g., between 3 and 100 characters)
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return res.status(400).json({ message: 'Name must be between 3 and 100 characters long.' });
    }
  
    // Validate description length (e.g., between 10 and 500 characters)
    if (trimmedDescription.length < 10 || trimmedDescription.length > 500) {
      return res.status(400).json({ message: 'Description must be between 10 and 500 characters long.' });
    }
  

    const updates: { [key: string]: string } = {};
    if (trimmedName) updates.name = trimmedName;
    if (trimmedDescription) updates.description = trimmedDescription;

    const result = await collection.updateOne(
      { _id: new ObjectId(forumId as string) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Forum not found" });
    }

    return res.status(200).json({ message: "Forum updated successfully" });
  }

  if (req.method === "DELETE") {
    // Delete forum
    const result = await collection.deleteOne({ _id: new ObjectId(forumId as string) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Forum not found" });
    }

    return res.status(200).json({ message: "Forum deleted successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
