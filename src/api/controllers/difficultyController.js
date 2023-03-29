import Difficulty from '../../models/difficultyModel.js';

export const getDifficulties = async (req, res) => {
  try {
    const difficulties = await Difficulty.find();
    res.status(200).json(difficulties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching difficulties' });
  }
};

export const addDifficulty = async (req, res) => {
  try {
    const difficulty = new Difficulty(req.body);
    await difficulty.save();
    res.status(201).json(difficulty);
  } catch (error) {
    res.status(500).json({ message: 'Error adding difficulty' });
  }
};

export const updateDifficulty = async (req, res) => {
  try {
    const difficulty = await Difficulty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(difficulty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating difficulty' });
  }
};

export const deleteDifficulty = async (req, res) => {
  try {
    await Difficulty.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Difficulty deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting difficulty' });
  }
};
