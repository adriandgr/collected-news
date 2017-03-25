const express = require('express');
const config = require('config');
const app = express();
const port = 8080;
var models = require("../models");

var env = process.env.NODE_ENV || 'development';


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