const express = require('express');
const {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresByCategory,
  getStoresWithPagination,
} = require('../controllers/storeController');
const router = express.Router();

// Create a new store
router.post('/stores', createStore);

// Get all stores
router.get('/stores', getStores);

// Get a single store by ID
router.get('/stores/:id', getStoreById);

// Update a store
router.put('/stores/:id', updateStore);

// Delete a store
router.delete('/stores/:id', deleteStore);

// Search stores by category
router.get('/stores/category/:category', getStoresByCategory);

// Get stores with pagination
router.get('/stores/paginate', getStoresWithPagination);

module.exports = router;