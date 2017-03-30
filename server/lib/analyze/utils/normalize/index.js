const Article = require('../../../models').Article;

function normalizeInRange(range, n) {
  [min, max] = range;
  return (2 * ((n - min) / (max - min)) - 1)
}

range = {};

module.exports = n => {

  return Article.aggregate('sentiment', 'max')
      .then(max => {
        return Article.aggregate('sentiment', 'min')
          .then(min => {
            return Promise.resolve([min, max]);
          });
      })
      .then(minAndMax => {
        return Promise.resolve(normalizeInRange(minAndMax, n));
      })
      .then(normalized => {
        return Promise.resolve(normalized);
      });

}