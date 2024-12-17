import { connectToDatabase } from '../lib/mongodb';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    getUsers: async () => {
      const { db } = await connectToDatabase();
      return await db.collection('users').find().toArray();
    },
  },
  Mutation: {
    signup: async (_: any, { email, password }: any) => {
      const { db } = await connectToDatabase();

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.collection('users').insertOne({ email, password: hashedPassword });

      return 'User created successfully';
    },
    login: async (_: any, { email, password }: any) => {
      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid credentials');

      return 'Login successful';
    },
  },
};
