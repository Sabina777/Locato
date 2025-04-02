const express = require('express');
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

// Create a new review
router.post('/reviews', createReview);

// Get all reviews
router.get('/reviews', getReviews);

// Get a single review by ID
router.get('/reviews/:id', getReviewById);

// Update a review
router.put('/reviews/:id', updateReview);

// Delete a review
router.delete('/reviews/:id', deleteReview);

module.exports = router;