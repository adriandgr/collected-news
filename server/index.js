const express = require('express');
const config = require('config');
const app = express();
const port = 8080;
var models = require("../models");

var env = process.env.NODE_ENV || 'development';


var User = models.sequelize.define('user', {
  username: models.Sequelize.STRING,
  birthday: models.Sequelize.DATE
});

models.sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});


// This is a test for a pull request

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});