import express from 'express';
import gamesRouter from './api/games';
import usersRouter from './api/users';
import { dbConnection } from './config/mongoConnection';

const app = express();
dbConnection().then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

app.use(express.json());
app.use('/api/games', gamesRouter);
app.use('/api/users', usersRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
