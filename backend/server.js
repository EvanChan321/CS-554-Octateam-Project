const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
