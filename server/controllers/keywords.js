const Keyword = require('../models').Keyword;
const ArticleKeyword = require('../models').ArticleKeyword;
const keywords = require('./queries/keywords');
const sequelize = require('../models').sequelize;

module.exports = {
  index(req, res) {
    keywords.list(data => {
      res.json(data);
    });
  },
  all(req, res) {
    Keyword.all({
      attributes: [
      'id',
      'name',
      ]
    })
    .then(keywords => res.json(keywords))
    .catch(err => console.error(err))
  },
  individual(req, res) {
    const keyword = req.params.keyword
    keywords.individual(keyword, data => {
      res.json(data);
    })
  }
};
