const Keyword = require('../models').Keyword;

module.exports = {
  create(req, res) {
    return Keyword
      .create({
        name: req.body.name,
      })
      .then((keyword) => res.status(201).send(keyword))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return Keyword
      .all()
      .then((keywords) => res.status(200).send(keywords))
      .catch((err) => res.status(400).send(err));
  },
};
