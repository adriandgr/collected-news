const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.set('views', [path.join(__dirname, '/views'), path.join(__dirname, '/../views')]);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/routes')(app);

app.get('*', (req, res) => res.render('vue_entry'));

module.exports = app;
