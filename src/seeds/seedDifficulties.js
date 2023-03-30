import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Difficulty from '../models/difficultyModel.js';

dotenv.config();

const difficulties = [
  { name: 'Easy' },
  { name: 'Medium' },
  { name: 'Hard' },
];

const seedDifficulties = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Difficulty.deleteMany({});
    await Difficulty.insertMany(difficulties);

    console.log('Difficulties seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding difficulties:', error);
    process.exit(1);
  }
};

seedDifficulties();
