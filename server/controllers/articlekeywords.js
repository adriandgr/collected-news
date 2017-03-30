const ArticleKeyword = require('../models').ArticleKeyword;

module.exports = {
  list(req, res) {
    return ArticleKeyword
      .all()
      .then((articleKeywords) => res.status(200).send(articleKeywords))
      .catch((err) => res.status(400).send(err));
  },
  async list1(req, res) {
    const articleKeywords = await ArticleKeyword.all();

    res.json(articleKeywords);
  },
};
