require('dotenv').config();

module.exports = {

  development: {
    database: 'docstore',
    username: 'postgres',
    password: 'docstore',
    host: '192.168.99.100',
    dialect: 'postgres'
  },

  test: {
    database: 'docstore',
    username: 'postgres',
    password: 'docstore',
    host: '192.168.99.100',
    dialect: 'postgres'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};