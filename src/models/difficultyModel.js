import mongoose from 'mongoose';

const difficultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Difficulty = mongoose.model('Difficulty', difficultySchema);

export default Difficulty;
