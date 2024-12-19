import { dbConnection, closeConnection } from "@/lib/mongoConnection";

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  const db = await dbConnection();
  forumCollection = await db.collection("forumposts").drop();
  gameCollection = await db.collection("games").drop();
  userCollection = await db.collection("users")

  try {
    await client.connect();
    
    const forums = [
      {
        _id: new ObjectId(),
        name: "General Gaming",
        description: "A forum to discuss all types of games.",
        threads: [
          {
            _id: new ObjectId(),
            title: "Top 10 Games of 2024",
            content: "Let's discuss the best games of this year!",
            createdAt: new Date(),
            createdBy: "user@example.com",
            comments: [
              {
                _id: new ObjectId(),
                content: "I think it's gonna be Cyberpunk 2077 for sure!",
                createdBy: "user1@example.com",
                createdAt: new Date(),
              },
              {
                _id: new ObjectId(),
                content: "Totally! The graphics are insane.",
                createdBy: "user2@example.com",
                createdAt: new Date(),
              },
            ],
          },
          {
            _id: new ObjectId(),
            title: "Best Gaming Consoles",
            content: "Which gaming console do you prefer?",
            createdAt: new Date(),
            createdBy: "user3@example.com",
            comments: [
              {
                _id: new ObjectId(),
                content: "PS5 all the way! Better exclusives.",
                createdBy: "user4@example.com",
                createdAt: new Date(),
              },
            ],
          },
        ],
      },
      {
        _id: new ObjectId(),
        name: "Indie Games",
        description: "A place to discuss indie games.",
        threads: [
          {
            _id: new ObjectId(),
            title: "Best Indie Games of 2024",
            content: "What are your favorite indie games this year?",
            createdAt: new Date(),
            createdBy: "user5@example.com",
            comments: [
              {
                _id: new ObjectId(),
                content: "I really enjoyed Hollow Knight!",
                createdBy: "user6@example.com",
                createdAt: new Date(),
              },
              {
                _id: new ObjectId(),
                content: "Stardew Valley is my go-to indie game.",
                createdBy: "user7@example.com",
                createdAt: new Date(),
              },
            ],
          },
          {
            _id: new ObjectId(),
            title: "Why Indie Games Are Great",
            content: "Indie games often offer the most innovative experiences. What do you think?",
            createdAt: new Date(),
            createdBy: "user8@example.com",
            comments: [],
          },
        ],
      },
    ];

    // Insert forum data with threads
    for (const forum of forums) {
      const insertedForum = await forumCollection.insertOne(forum);

      // Insert threads with comments
      for (const thread of forum.threads) {
        const insertedThread = await threadCollection.insertOne({
          ...thread,
          forumId: insertedForum.insertedId, // Reference to forumId
        });

        // Insert comments for the thread
        for (const comment of thread.comments) {
          await threadCollection.updateOne(
            { _id: insertedThread.insertedId },
            {
              $push: { comments: comment },
            }
          );
        }
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
