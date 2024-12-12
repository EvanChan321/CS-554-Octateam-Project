import { users } from '../config/mongoCollections';

export const getUser = async (userId: string) => {
  const usersCollection = await users();
  return usersCollection.findOne({ _id: userId });
};
