const Source = require('../../../models').Source;

module.exports = callback => {
  Source.findAll()
    .then(sources => {
      callback(sources.map(source => {
        return { id: source.id, link: source.link };
      }));
    });
};
