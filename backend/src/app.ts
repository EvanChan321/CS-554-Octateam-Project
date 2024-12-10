import express from 'express';
import { dbConnection } from './config/mongoConnection';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Root Endpoint
app.get('/', (req, res) => res.send('API is running!'));

// Example Routes Placeholder
// app.use('/api/games', gamesRoutes);
// app.use('/api/users', usersRoutes);

// Start Server
const startServer = async () => {
  try {
    const db = await dbConnection();
    console.log('Connected to MongoDB!');
    
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

startServer();
