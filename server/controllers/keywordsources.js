const KeywordSource = require('../models').KeywordSource;

module.exports = {
  create(req, res) {
    return KeywordSource
      .create({
        sourceId: req.body.sourceId,
        keywordId: req.body.keywordId,
      })
      .then((keywordSource) => res.status(201).send(keywordSource))
      .catch((err) => res.status(400).send(err));
  },
  list(req, res) {
    return KeywordSource
      .all()
      .then((keywordSources) => res.status(200).send(keywordSources))
      .catch((err) => res.status(400).send(err));
  },
};
