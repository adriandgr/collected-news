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

var Article = sequelize.define('article', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  publish_date: Sequelize.DATE,
  body: Sequelize.TEXT,
  body_md5: Sequelize.STRING,
  source_id: Sequelize.INTEGER,
  url: Sequelize.STRING,
  thumbnail_url: Sequelize.STRING,
  sentiment: Sequelize.FLOAT
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Article = Article;

module.exports = db;
