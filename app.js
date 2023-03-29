import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import questionRoutes from './src/api/routes/questionRoutes.js';
import categoryRoutes from './src/api/routes/categoryRoutes.js';
import difficultyRoutes from './src/api/routes/difficultyRoutes.js';
import quizRoutes from './src/api/routes/quizRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/questions', questionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/difficulties', difficultyRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Trivia Quiz Plugin server is running on port ${port}`);
});

export default app;