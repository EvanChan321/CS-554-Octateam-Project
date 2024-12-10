import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnection } from './config/mongoConnection';
import gamesRoutes from './api/games';
// Import additional routes as needed
// import usersRoutes from './api/users';
// import forumsRoutes from './api/forums';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/games', gamesRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/forums', forumsRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('API is running!'));

// Start Server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await dbConnection();
    console.log('Connected to MongoDB!');

    // Start Express server
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error starting the server:', err);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();

export default app;
