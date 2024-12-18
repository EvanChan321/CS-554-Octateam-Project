import { NextApiRequest, NextApiResponse } from "next";
import { forumPosts } from "@/lib/mongoCollections";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { forumId } = req.query;
  const collection = await forumPosts();

  if (req.method === "POST") {
    const { title, content, createdBy } = req.body;

    if (!title || !content || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const thread = {
      _id: new ObjectId(),
      title,
      content,
      createdAt: new Date(),
      createdBy,
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
