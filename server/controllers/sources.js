const Source = require('../models').Source;

module.exports = {
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
