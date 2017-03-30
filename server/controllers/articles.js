const Article = require('../models').Article;

module.exports = {
  index(req, res) {
    res.json({ status: 'not yet built '});
  },
  all(req, res) {
    return Article
      .all()
      .then((articles) => res.status(200).send(articles))
      .catch((err) => res.status(400).send(err));
  },
  individual(req, res) {
    const id = req.params.id;
    return Article
      .findById(id)
      .then(article => res.json(article))
      .catch(err => console.error(err));
  }
};
