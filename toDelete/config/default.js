require('dotenv').config();

module.exports = {
  db: {
    dialect: 'postgres',
    username: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PWD,
    database: process.env.DB_PROD_NAME,
    host: 'localhost'
  },
  debug: true,
  logo: 'Boilerplate',
  namespace: 'boilerplate',
  server: {
    port: process.env.DB_PROD_PORT
  }
};