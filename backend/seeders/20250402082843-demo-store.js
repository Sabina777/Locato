'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stores', [
      {
        name: 'Store 1',
        address: '123 Main St',
        latitude: 40.7128,
        longitude: -74.0060,
        category: 'Electronics',
        phone: '123-456-7890',
        website: 'http://store1.com',
        opening_hours: JSON.stringify({ Monday: '9am - 5pm', Tuesday: '9am - 5pm' }), // Stringify the object
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stores', null, {});
  },
};