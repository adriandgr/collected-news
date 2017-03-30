const Source = require('../models').Source;

module.exports = {
  index(req, res) {
    return Source.all()
      .then(sources => {
        res.json(sources);
      })
      .catch(err => {
        res.status(400).send(err)
      });
  },
  individual(req, res) {
    const id = req.params.id;
    return Source
      .findById(id)
      .then(source => res.json(source))
      .catch(err => console.error(err));
  }
};
