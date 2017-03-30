const Keyword = require('../models').Keyword;
const keywords = require('./queries/keywords');

module.exports = {
  list(req, res) {
    keywords.getData(data => {
      res.json(data);
    });
  },
};
