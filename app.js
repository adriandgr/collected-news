const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  res.render('vue_entry');
}));

module.exports = app;
