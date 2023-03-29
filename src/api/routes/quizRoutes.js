import express from 'express';
import { getQuizQuestions, submitAnswer } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getQuizQuestions);
router.post('/submit-answer', submitAnswer);

export default router;
