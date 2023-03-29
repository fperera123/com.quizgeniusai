import Question from '../../models/questionModel.js';

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('category').populate('difficulty');
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error adding question' });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question' });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question' });
  }
};
