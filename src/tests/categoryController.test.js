import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app.js';
import Category from '../models/categoryModel.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Category Controller', function() {
    this.timeout(50000);
  before(async () => {
    await Category.deleteMany({});
  });

  describe('GET /api/categories', () => {
    it('should fetch all categories', async () => {
      const res = await chai.request(app).get('/api/categories');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /api/categories', () => {
    it('should add a new category', async () => {
      const category = { name: 'Test Category' };
      const res = await chai.request(app).post('/api/categories').send(category);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal(category.name);
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('should update a category', async () => {
      const category = new Category({ name: 'Old Category' });
      await category.save();

      const updatedCategory = { name: 'Updated Category' };
      const res = await chai.request(app).put(`/api/categories/${category._id}`).send(updatedCategory);
      expect(res).to.have.status(200);
      expect(res.body.name).to.equal(updatedCategory.name);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('should delete a category', async () => {
      const category = new Category({ name: 'Category to Delete' });
      await category.save();

      const res = await chai.request(app).delete(`/api/categories/${category._id}`);
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Category deleted');
    });
  });
});
