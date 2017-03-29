const ArticleKeyword = require('../models').ArticleKeyword;

module.exports = {
  create(req, res) {
    return ArticleKeyword
      .create({
        articleId: req.body.articleId,
        keywordId: req.body.keywordId,
        frequency: req.body.frequency,
      })
      .then((articleKeyword) => res.status(201).send(articleKeyword))
      .catch((err) => res.status(400).send(err));
  },
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
