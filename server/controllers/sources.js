const Source = require('../models').Source;

module.exports = {
  create(req, res) {
    return Source
      .create({
        name: req.body.name,
        description: req.body.description,
        link: req.body.url,
      })
      .then((source) => res.status(201).send(source))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return Source.all()
      .then(sources => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
        res.json(sources);
      })
      .catch(err => {
        res.status(400).send(err)
      });
  },
};
