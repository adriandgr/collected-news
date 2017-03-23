require('dotenv').config();

module.exports = {
  db: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: 'localhost',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  debug: true
};