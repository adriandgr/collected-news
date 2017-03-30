const Article = require('../models').Article;

module.exports = {
  list(req, res) {
    return Article
      .all()
      .then((article) => res.status(200).send(article))
      .catch((err) => res.status(404).send({msg: 'article not found'}));
  },
  find(req, res) {
    return Article.findById(req.params.id)
      .then((article) => {
        return Promise.resolve([article, article.getKeywords()]);
      })
      .then((articleAndKeywords) => {
        [article, keywords] = articleAndKeywords;
        keywords.then((result) => {
          const articleKeywords = [];
          result.forEach((k) => {
            articleKeywords.push(k.name);
          });
          res.json({ article, keywords: articleKeywords });
        });
      })
      .catch((err) => res.status(404).send(err));
  },
};
