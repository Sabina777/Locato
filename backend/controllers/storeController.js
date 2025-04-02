const { Store } = require('../models');

// Create a new store
async function createStore(req, res) {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: "Error creating store", error: err.message });
  }
}

// Get all stores
async function getStores(req, res) {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores", error: err.message });
  }
}

// Get a single store by IDs
async function getStoreById(req, res) {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ message: "Error fetching store", error: err.message });
  }
}

// Update a store
async function updateStore(req, res) {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    await store.update(req.body);
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ message: "Error updating store", error: err.message });
  }
}

// Delete a store
async function deleteStore(req, res) {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    await store.destroy();
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting store", error: err.message });
  }
}

// Search stores by category
async function getStoresByCategory(req, res) {
  try {
    const stores = await Store.findAll({
      where: { category: req.params.category },
    });
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores by category", error: err.message });
  }
}

// Get stores with pagination
async function getStoresWithPagination(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const stores = await Store.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      total: stores.count,
      pages: Math.ceil(stores.count / limit),
      currentPage: parseInt(page),
      data: stores.rows,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores with pagination", error: err.message });
  }
}

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresByCategory,
  getStoresWithPagination,
};