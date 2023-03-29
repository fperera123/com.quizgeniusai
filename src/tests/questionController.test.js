import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import Question from '../models/questionModel.js';
import Category from '../models/categoryModel.js';
import Difficulty from '../models/difficultyModel.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Question Controller', function() {
  this.timeout(50000);

  let categoryId;
  let difficultyId;

  before(async () => {
    await Category.deleteOne({ name: 'Test Category' });
    await Difficulty.deleteOne({  name: 'Test Difficulty'});

    const category = new Category({ name: 'Test Category' });
    categoryId = (await category.save())._id;

    const difficulty = new Difficulty({ name: 'Test Difficulty' });
    difficultyId = (await difficulty.save())._id;
  });

  after(async () => {
    await Category.deleteOne({ _id: categoryId });
    await Difficulty.deleteOne({ _id: difficultyId });
  });

  describe('GET /api/questions', () => {
    it('should return a list of questions', async () => {
      const res = await chai.request(app).get('/api/questions');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /api/questions', () => {
    it('should add a new question', async () => {
      const question = {
        category: categoryId,
        difficulty: difficultyId,
        questionText: 'Test Question',
        correctAnswer: 'Answer A',
        incorrectAnswers: ['Answer B', 'Answer C', 'Answer D'],
      };

      const res = await chai.request(app).post('/api/questions').send(question);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      await Question.deleteOne({ _id: res.body._id });
    });
  });

  describe('PUT /api/questions/:id', () => {
    it('should update an existing question', async () => {
      const question = new Question({
        category: categoryId,
        difficulty: difficultyId,
        questionText: 'Test Question',
        correctAnswer: 'Answer A',
        incorrectAnswers: ['Answer B', 'Answer C', 'Answer D'],
      });

      const createdQuestion = await question.save();
      const updatedQuestionText = 'Updated Test Question';
      const res = await chai
        .request(app)
        .put(`/api/questions/${createdQuestion._id}`)
        .send({ questionText: updatedQuestionText });

      expect(res.status).to.equal(200);
      expect(res.body.questionText).to.equal(updatedQuestionText);
      await Question.deleteOne({ _id: createdQuestion._id });
    });
  });

  describe('DELETE /api/questions/:id', () => {
    it('should delete a question', async () => {
      const question = new Question({
        category: categoryId,
        difficulty: difficultyId,
        questionText: 'Test Question',
        correctAnswer: 'Answer A',
        incorrectAnswers: ['Answer B', 'Answer C', 'Answer D'],
      });

      const createdQuestion = await question.save();
      const res = await chai.request(app).delete(`/api/questions/${createdQuestion._id}`);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Question deleted');
    });
  });
});
