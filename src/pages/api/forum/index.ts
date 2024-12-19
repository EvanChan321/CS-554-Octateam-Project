import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";
import redis from '@/lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collection = await forumPosts();

  if (req.method === "GET") {
    const cachedForums = await redis.get(`forumsList`);
    if (cachedForums) {
      return res.status(200).json({forums: cachedForums });  
    }
    const forums = await collection.find({}).toArray();
    await redis.set(`forumsList`, JSON.stringify(forums));
    return res.status(200).json(forums);
  }

  if (req.method === "POST") {
    const { name, description, createdBy } = req.body;

    if (!name || !description || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const forum = {
      _id: new ObjectId(),
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
      threads: [],
    };

    const result = await collection.insertOne(forum);
    return res.status(201).json({ id: result.insertedId, ...forum });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
