const KeywordSource = require('../models').KeywordSource;

module.exports = {
  list(req, res) {
    return KeywordSource
      .all()
      .then((keywordSources) => res.status(200).send(keywordSources))
      .catch((err) => res.status(400).send(err));
  },
};
