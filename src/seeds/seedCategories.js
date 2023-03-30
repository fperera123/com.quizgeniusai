import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/categoryModel.js';

dotenv.config();

const categories = [
  { name: 'Movies' },
  { name: 'Sports' },
  { name: 'History' },
  { name: 'Geography' },
  { name: 'Science' },
  { name: 'Literature' },
  { name: 'Music' },
  { name: 'General Knowledge' },
  { name: 'Technology' },
  { name: 'Art and Culture' },
];


const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Category.deleteMany({});
    await Category.insertMany(categories);

    console.log('Categories seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
