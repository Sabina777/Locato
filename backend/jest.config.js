module.exports = {
  moduleNameMapper: {
    '^@models$': '<rootDir>/models', // Direct import like '@models'
    '^@models/(.*)$': '<rootDir>/models/$1', // Importing specific files like '@models/store'
    '^@controllers/(.*)$': '<rootDir>/controllers/$1',
    '^@routes/(.*)$': '<rootDir>/routes/$1',
  },
  testEnvironment: 'node',
};