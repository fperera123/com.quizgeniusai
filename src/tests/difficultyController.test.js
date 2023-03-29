import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import Difficulty from '../models/difficultyModel.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Difficulty Controller', function() {
    this.timeout(50000);
  beforeEach(async () => {
    await Difficulty.deleteMany({});
  });

  describe('GET /api/difficulties', () => {
    it('should fetch all difficulties', async () => {
      const difficulty = new Difficulty({ name: 'Test Difficulty' });
      await difficulty.save();

      const res = await chai.request(app).get('/api/difficulties');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal('Test Difficulty');
    });
  });

  describe('POST /api/difficulties', () => {
    it('should add a new difficulty', async () => {
      const res = await chai.request(app).post('/api/difficulties').send({ name: 'New Difficulty' });
      expect(res.status).to.equal(201);
      expect(res.body.name).to.equal('New Difficulty');
    });
  });

  describe('PUT /api/difficulties/:id', () => {
    it('should update a difficulty', async () => {
      const difficulty = new Difficulty({ name: 'Test Difficulty' });
      await difficulty.save();

      const res = await chai.request(app)
        .put(`/api/difficulties/${difficulty._id}`)
        .send({ name: 'Updated Difficulty' });

      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Updated Difficulty');
    });
  });

  describe('DELETE /api/difficulties/:id', () => {
    it('should delete a difficulty', async () => {
      const difficulty = new Difficulty({ name: 'Test Difficulty' });
      await difficulty.save();

      const res = await chai.request(app).delete(`/api/difficulties/${difficulty._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Difficulty deleted');
    });
  });
});
