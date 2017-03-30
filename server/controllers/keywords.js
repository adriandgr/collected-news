const Keyword = require('../models').Keyword;
const keywords = require('./queries/keywords');

module.exports = {
  list(req, res) {
    keywords.list(data => {
      res.json(data);
    });
  },
  individual(req, res) {
    const keyword = req.params.keyword
    keywords.individual(keyword, data => {
      res.json(data);
    })
  }
};
