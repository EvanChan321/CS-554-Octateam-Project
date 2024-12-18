import { ObjectId } from "mongodb";

// Comment type definition
export interface Comment {
  _id: ObjectId;
  content: string;
  parentCommentId: ObjectId | null;
  createdAt: Date;
  createdBy: string;
}

// Thread type definition
export interface Thread {
  _id: ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  comments: Comment[];
}

// Forum type definition
export interface Forum {
  _id: ObjectId;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  threads: Thread[];
}
