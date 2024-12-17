import { users, games } from '@/lib/mongoCollections';

export const resolvers = {
  Query: {
    // Fetch a single user by UID
    getUser: async (_: any, { uid }: { uid: string }) => {
      try {
        const usersCollection = await users();
        const user = await usersCollection.findOne({ uid });

        if (!user) {
          throw new Error(`User with UID "${uid}" not found.`);
        }
        return user;
      } catch (error: any) {
        console.error('Error fetching user:', error.message);
        throw new Error('Failed to fetch user. ' + error.message);
      }
    },

    // Fetch all users
    getAllUsers: async () => {
      try {
        const usersCollection = await users();
        return await usersCollection.find({}).toArray();
      } catch (error: any) {
        console.error('Error fetching users:', error.message);
        throw new Error('Failed to fetch users.');
      }
    },

    // Fetch all games
    getAllGames: async () => {
      try {
        const gamesCollection = await games();
        return await gamesCollection.find({}).toArray();
      } catch (error: any) {
        console.error('Error fetching games:', error.message);
        throw new Error('Failed to fetch games.');
      }
    },

    // Fetch a game by ID
    getGameById: async (_: any, { gameId }: { gameId: string }) => {
      try {
        const gamesCollection = await games();
        const game = await gamesCollection.findOne({ gameId });

        if (!game) {
          throw new Error(`Game with ID "${gameId}" not found.`);
        }
        return game;
      } catch (error: any) {
        console.error('Error fetching game:', error.message);
        throw new Error('Failed to fetch game. ' + error.message);
      }
    },
  },

  Mutation: {
    // Add a new user to MongoDB
    addUser: async (_: any, { email, username }: { email: string; username: string }) => {
      try {
        const usersCollection = await users();
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
          throw new Error(`User with email "${email}" already exists.`);
        }

        const newUser = {
          uid: Date.now().toString(), // Generate a temporary UID (Firebase UID will be managed separately)
          email,
          username,
          profilePicture: null,
          createdAt: new Date().toISOString(),
        };

        await usersCollection.insertOne(newUser);
        return newUser;
      } catch (error: any) {
        console.error('Error adding user:', error.message);
        throw new Error('Failed to add user. ' + error.message);
      }
    },

    // Add a new game to MongoDB
    addGame: async (
      _: any,
      { gameId, name, description, genre }: { gameId: string; name: string; description?: string; genre?: string }
    ) => {
      try {
        const gamesCollection = await games();
        const existingGame = await gamesCollection.findOne({ gameId });

        if (existingGame) {
          throw new Error(`Game with ID "${gameId}" already exists.`);
        }

        const newGame = {
          gameId,
          name,
          description: description || '',
          genre: genre || 'Unknown',
          createdAt: new Date().toISOString(),
        };

        await gamesCollection.insertOne(newGame);
        return newGame;
      } catch (error: any) {
        console.error('Error adding game:', error.message);
        throw new Error('Failed to add game. ' + error.message);
      }
    },
  },
};
