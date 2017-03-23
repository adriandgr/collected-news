const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const config    = require('config');
const db        = {};


const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  pool: config.db.pool
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
