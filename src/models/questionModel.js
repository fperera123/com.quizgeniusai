import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  difficulty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Difficulty',
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  incorrectAnswers: {
    type: [String],
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
