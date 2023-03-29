import Question from '../../models/questionModel.js';

export const getQuizQuestions = async (req, res) => {
  const { category, difficulty } = req.query;

  try {
    const questions = await Question.find({ category, difficulty }).limit(10);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz questions' });
  }
};


export const submitAnswer = async (req, res) => {
  const { questionId, userAnswer } = req.body;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    const isCorrect = question.correctAnswer === userAnswer;
    res.status(200).json({ isCorrect });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating answer' });
  }
};
