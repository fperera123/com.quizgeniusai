import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/questionModel.js';
import Category from '../models/categoryModel.js';
import Difficulty from '../models/difficultyModel.js';

dotenv.config();

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Sample questions with category and difficulty names
    const questionsData = [
      {
        categoryName: 'Movies',
        difficultyName: 'Easy',
        questionText: 'Sample question 1?',
        correctAnswer: 'Answer A',
        incorrectAnswers: ['Answer B', 'Answer C', 'Answer D'],
      },
      {
        categoryName: 'Sports',
        difficultyName: 'Medium',
        questionText: 'Sample question 2?',
        correctAnswer: 'Answer B',
        incorrectAnswers: ['Answer A', 'Answer C', 'Answer D'],
      },
      // Add more questions
    ];

    // Fetch categories and difficulties
    const categories = await Category.find();
    const difficulties = await Difficulty.find();

    // Map questionsData to questions with matching IDs
    const questions = questionsData.map((q) => {
      const category = categories.find((c) => c.name === q.categoryName);
      const difficulty = difficulties.find((d) => d.name === q.difficultyName);

      return {
        category: category._id,
        difficulty: difficulty._id,
        questionText: q.questionText,
        correctAnswer: q.correctAnswer,
        incorrectAnswers: q.incorrectAnswers,
      };
    });

    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log('Questions seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
};

seedQuestions();
