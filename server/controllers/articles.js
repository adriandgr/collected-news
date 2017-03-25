const Article = require('../models').Article;

module.exports = {
  create(req, res) {
    return Article
      .create({
        title: req.body.title,
        author: req.body.author,
        pubDate: req.body.pubDate,
        snippet: req.body.snippet,
        content: req.body.content,
        contentHash: req.body.contentHash,
        link: req.body.link,
        leadImageUrl: req.body.leadImageUrl,
        sentiment: req.body.sentiment,
        articleId: req.body.articleId,

      })
      .then((article) => res.status(201).send(article))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return Article
      .all()
      .then((articles) => res.status(200).send(articles))
      .catch((err) => res.status(400).send(err));
  },
};
