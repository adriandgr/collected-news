const Source = require('../models').Source;

module.exports = {
  list(req, res) {
    return Source
      .all()
      .then((sources) => res.status(200).send(sources))
      .catch((err) => res.status(400).send(err));
  },
};
