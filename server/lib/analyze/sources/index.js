const Source = require('../../../models').Source;

module.exports = callback => {
  Source.findAll()
    .then(sources => {
      const feeds = sources.map(source => { return { id: source.id, link: source.link }; });
      callback(feeds, sources.length);
    });
};
