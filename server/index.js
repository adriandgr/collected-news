const express = require('express');
const config = require('config');
const app = express();
const port = 8080;

var env = process.env.NODE_ENV || 'development';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  pool: config.db.pool
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
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