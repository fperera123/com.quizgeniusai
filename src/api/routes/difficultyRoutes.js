import express from 'express';
import { getDifficulties, addDifficulty, updateDifficulty, deleteDifficulty } from '../controllers/difficultyController.js';

const router = express.Router();

router.get('/', getDifficulties);
router.post('/', addDifficulty);
router.put('/:id', updateDifficulty);
router.delete('/:id', deleteDifficulty);

export default router;
