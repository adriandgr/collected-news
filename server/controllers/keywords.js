const Keyword = require('../models').Keyword;
const ArticleKeyword = require('../models').ArticleKeyword;
const keywords = require('./queries/keywords');
const sequelize = require('../models').sequelize;

module.exports = {
  index(req, res) {
    let page = req.query.p * 6 || 0
    keywords.list(data => {
      res.json(data.filter(each => {
        let pos = data.indexOf(each)
        return (pos >= page && pos < page + 6)
      }));
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
