const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Load environment variables from .env file
dotenv.config();

// Create the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Add security headers

// Route imports
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
