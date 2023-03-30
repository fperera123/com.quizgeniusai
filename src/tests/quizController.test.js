import chai from 'chai';
import chaiHttp from 'chai-http';

import Question from '../models/questionModel.js';
import app from '../../app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Quiz Controller', function () {
  this.timeout(50000);

  let questions = [];

  before(async () => {
    // Create sample questions using the addQuestion endpoint
    const questionData = [
      {
        category: '61079f4c7e4ff2f8d7b11738',
        difficulty: '61079f4c7e4ff2f8d7b11739',
        questionText: 'What is the capital city of France?',
        correctAnswer: 'Paris',
        incorrectAnswers: ['Berlin', 'Madrid', 'Rome'],
      },
      // Add more sample questions if needed
    ];

    for (const data of questionData) {
      const question = new Question(data);
      await question.save();
      questions.push(question);
    }
  });

  after(async () => {
    // Remove the created questions after the tests
    for (const question of questions) {
      await Question.findByIdAndDelete(question._id);
    }
  });

  describe('GET /api/quiz', () => {
    it('should return quiz questions', async () => {
      const res = await chai
        .request(app)
        .get('/api/quiz')
        .query({ category: '61079f4c7e4ff2f8d7b11738', difficulty: '61079f4c7e4ff2f8d7b11739' });

      expect(res.status).to.equal(200);
      expect(res.body[0].questionText).to.equal('What is the capital city of France?');
    });
  });

  describe('POST /api/quiz/submit-answer', () => {
    it('should return true if the answer is correct', async () => {
      const res = await chai
        .request(app)
        .post('/api/quiz/submit-answer')
        .send({ questionId: questions[0]._id, userAnswer: 'Paris' });

      expect(res.status).to.equal(200);
      expect(res.body.isCorrect).to.be.true;
    });

    it('should return false if the answer is incorrect', async () => {
      const res = await chai
        .request(app)
        .post('/api/quiz/submit-answer')
        .send({ questionId: questions[0]._id, userAnswer: 'Berlin' });

      expect(res.status).to.equal(200);
      expect(res.body.isCorrect).to.be.false;
    });

    it('should return an error if the question is not found', async () => {
      const res = await chai
        .request(app)
        .post('/api/quiz/submit-answer')
        .send({ questionId: '0123456789abcdef01234567', userAnswer: 'ANY_ANSWER' });
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal('Question not found');
    });
  });
});
