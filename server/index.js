const express = require('express');
const config = require('config');
const app = express();
const port = 8080;
var models = require("../models");

var env = process.env.NODE_ENV || 'development';


// var Article = models.sequelize.define('article', {
//   title: models.Sequelize.STRING,
//   author: models.Sequelize.STRING,
//   publish_date: models.Sequelize.DATE,
//   body: models.Sequelize.TEXT,
//   body_md5: models.Sequelize.STRING,
//   source_id: models.Sequelize.INTEGER,
//   url: models.Sequelize.STRING,
//   thumbnail_url: models.Sequelize.STRING,
//   sentiment: models.Sequelize.FLOAT
// });

models.sequelize.sync().then(function() {
  return models.Article.create({
    title: 'janedoe',
    publish_date: new Date(1980, 6, 20)
  });
}).then(function(entry) {
  console.log(entry.get({
    plain: true
  }));
});


// This is a test for a pull request

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});