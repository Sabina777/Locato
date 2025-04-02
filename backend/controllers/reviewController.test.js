const { createReview, getReviews, getReviewById, updateReview, deleteReview } = require('./reviewController');
const { Review } = require('@models');

// Mock the Review model
jest.mock('@models', () => ({
  Review: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('Review Controller', () => {
  describe('createReview', () => {
    it('should create a new review and return it', async () => {
      const req = { body: { user_id: 1, store_id: 1, rating: 5, comment: 'Great store!' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Review.create.mockResolvedValue(req.body);

      await createReview(req, res);

      expect(Review.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  describe('getReviews', () => {
    it('should fetch all reviews and return them', async () => {
      const reviews = [{ id: 1, rating: 5, comment: 'Great store!' }];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Review.findAll.mockResolvedValue(reviews);

      await getReviews(req, res);

      expect(Review.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(reviews);
    });
  });

  describe('getReviewById', () => {
    it('should fetch a review by ID and return it', async () => {
      const review = { id: 1, rating: 5, comment: 'Great store!' };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Review.findByPk.mockResolvedValue(review);

      await getReviewById(req, res);

      expect(Review.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(review);
    });
  });

  describe('updateReview', () => {
    it('should update a review and return it', async () => {
      const review = { id: 1, rating: 5, comment: 'Great store!', update: jest.fn() };
      const req = { params: { id: 1 }, body: { comment: 'Updated comment' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Review.findByPk.mockResolvedValue(review);
      review.update.mockResolvedValue({ ...review, ...req.body });

      await updateReview(req, res);

      expect(Review.findByPk).toHaveBeenCalledWith(1);
      expect(review.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deleteReview', () => {
    it('should delete a review and return a success message', async () => {
      const review = { id: 1, destroy: jest.fn() };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Review.findByPk.mockResolvedValue(review);
      review.destroy.mockResolvedValue();

      await deleteReview(req, res);

      expect(Review.findByPk).toHaveBeenCalledWith(1);
      expect(review.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Review deleted successfully' });
    });
  });
});