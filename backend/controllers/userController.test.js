const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('./userController');
const { User } = require('@models');
const bcrypt = require('bcrypt');

// Mock the User model
jest.mock('@models', () => ({
  User: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a new user and return it', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.create.mockResolvedValue(req.body);

      await createUser(req, res);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it('should return a 500 error if creation fails', async () => {
      const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.create.mockRejectedValue(new Error('Database error'));

      await createUser(req, res);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating user',
        error: 'Database error',
      });
    });
  });

  describe('getUsers', () => {
    it('should fetch all users and return them', async () => {
      const users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findAll.mockResolvedValue(users);

      await getUsers(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe('getUserById', () => {
    it('should fetch a user by ID and return it', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByPk.mockResolvedValue(user);

      await getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return a 404 error if user is not found', async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByPk.mockResolvedValue(null);

      await getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update a user and return it', async () => {
      const user = { id: 1, name: 'John Doe', email: 'john@example.com', update: jest.fn() };
      const req = { params: { id: 1 }, body: { name: 'Updated Name' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByPk.mockResolvedValue(user);
      user.update.mockResolvedValue({ ...user, ...req.body });

      await updateUser(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(user.update).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return a success message', async () => {
      const user = { id: 1, destroy: jest.fn() };
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findByPk.mockResolvedValue(user);
      user.destroy.mockResolvedValue();

      await deleteUser(req, res);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(user.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });
  });
});