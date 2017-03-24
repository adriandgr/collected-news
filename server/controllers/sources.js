const Source = require('../models').Source;

module.exports = {
  create(req, res) {
    return Source
      .create({
        name: req.body.name,
        url: req.body.url,
      })
      .then((source) => res.status(201).send(source))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return Source
      .all()
      .then((sources) => res.status(200).send(sources))
      .catch((err) => res.status(400).send(err));
  },
};
