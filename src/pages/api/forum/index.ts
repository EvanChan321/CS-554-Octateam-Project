import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collection = await forumPosts();

  if (req.method === "GET") {
    const forums = await collection.find().toArray();
    return res.status(200).json(forums);
  }

  if (req.method === "POST") {
    const { name, description, createdBy } = req.body;

    if (!name || !description || !createdBy) {
      return res.status(400).json({ message: 'Name, description, and createdBy are required.' });
    }
  
    // Ensure all fields are strings
    if (
      typeof name !== 'string' || 
      typeof description !== 'string' || 
      typeof createdBy !== 'string'
    ) {
      return res.status(400).json({ message: 'All fields must be strings.' });
    }
  
    // Trim inputs
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedCreatedBy = createdBy.trim();
  
    // Validate name length (e.g., between 3 and 100 characters)
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return res.status(400).json({ message: 'Name must be between 3 and 100 characters long.' });
    }
  
    // Validate description length (e.g., between 10 and 500 characters)
    if (trimmedDescription.length < 10 || trimmedDescription.length > 500) {
      return res.status(400).json({ message: 'Description must be between 10 and 500 characters long.' });
    }

    const forum = {
      _id: new ObjectId(),
      name:trimmedName,
      description:trimmedDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy:trimmedCreatedBy,
      threads: [],
    };

    const result = await collection.insertOne(forum);
    return res.status(201).json({ id: result.insertedId, ...forum });
  }

  return res.status(405).json({ message: "Method not allowed" });
}