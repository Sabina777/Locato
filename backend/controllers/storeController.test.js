const { createStore, getStores ,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresByCategory,
  getStoresWithPagination,
} = require('./storeController');
const { Store } = require('@models');

// Mock the Store model
jest.mock('@models', () => ({
  Store: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findAndCountAll: jest.fn(),
  },
}));



describe('Store Controller', () => {
  describe('createStore', () => {
    it('should create a new store and return it', async () => {
      const req = { body: { name: 'Test Store', address: '123 Main St' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.create.mockResolvedValue(req.body);

      await createStore(req, res);

      expect(Store.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return a 500 error if creation fails', async () => {
      const req = { body: { name: 'Test Store', address: '123 Main St' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.create.mockRejectedValue(new Error('Database error'));

      await createStore(req, res);

      expect(Store.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating store',
        error: 'Database error',
      });
    });
  });

  describe('getStores', () => {
    it('should fetch all stores and return them', async () => {
      const stores = [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findAll.mockResolvedValue(stores);

      await getStores(req, res);

      expect(Store.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(stores);
    });

    it('should return a 500 error if fetching fails', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findAll.mockRejectedValue(new Error('Database error'));

      await getStores(req, res);

      expect(Store.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching stores',
        error: 'Database error',
      });
    });
  });

  describe('getStoreById', () => {
    it('should fetch a store by ID and return it', async () => {
      const store = { id: 1, name: 'Store 1' };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByPk.mockResolvedValue(store);

      await getStoreById(req, res);

      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(store);
    });

    it('should return a 404 error if store is not found', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByPk.mockResolvedValue(null);

      await getStoreById(req, res);

      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Store not found' });
    });
  });
  describe('updateStore', () => {
    it('should update a store and return it', async () => {
      const store = { id: 1, name: 'Store 1', update: jest.fn() };
      const req = { params: { id: 1 }, body: { name: 'Updated Store' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock `findByPk` to return the store
      Store.findByPk.mockResolvedValue(store);
  
      // Mock `update` to return the updated store
      store.update.mockResolvedValue({ ...store, ...req.body });
  
      await updateStore(req, res);
  
      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(store.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  
    it('should return a 404 error if store is not found', async () => {
      const req = { params: { id: 1 }, body: { name: 'Updated Store' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock `findByPk` to return null
      Store.findByPk.mockResolvedValue(null);
  
      await updateStore(req, res);
  
      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Store not found' });
    });
  });

  describe('deleteStore', () => {
    it('should delete a store and return a success message', async () => {
      const store = { id: 1, destroy: jest.fn() };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByPk.mockResolvedValue(store);
      store.destroy.mockResolvedValue();

      await deleteStore(req, res);

      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(store.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Store deleted successfully' });
    });

    it('should return a 404 error if store is not found', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findByPk.mockResolvedValue(null);

      await deleteStore(req, res);

      expect(Store.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Store not found' });
    });
  });

  describe('getStoresByCategory', () => {
    it('should fetch stores by category and return them', async () => {
      const stores = [{ id: 1, category: 'Electronics' }];
      const req = { params: { category: 'Electronics' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findAll.mockResolvedValue(stores);

      await getStoresByCategory(req, res);

      expect(Store.findAll).toHaveBeenCalledWith({ where: { category: 'Electronics' } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(stores);
    });
  });

  describe('getStoresWithPagination', () => {
    it('should fetch stores with pagination and return them', async () => {
      const stores = { count: 2, rows: [{ id: 1, name: 'Store 1' }, { id: 2, name: 'Store 2' }] };
      const req = { query: { page: 1, limit: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Store.findAndCountAll.mockResolvedValue(stores);

      await getStoresWithPagination(req, res);

      expect(Store.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        total: 2,
        pages: 1,
        currentPage: 1,
        data: stores.rows,
      });
    });
  });
});

