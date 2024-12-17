import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import listRoutes from './routes/listRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/forum', forumRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port localhost:${PORT}`);
});
