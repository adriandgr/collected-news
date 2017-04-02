const {Article} = require('../../../../models');

function normalizeInRange(min, max, sentiment) {
  if (sentiment > max) {
    return +1;
  } else if (sentiment < min) {
    return -1;
  } else {
    return (2 * ((sentiment - min) / (max - min)) - 1);
  }
}

module.exports = (articleId, sentiment) => {
  return Article.aggregate('sentiment', 'min')
      .then(min => {
        return Article.aggregate('sentiment', 'max')
          .then(max => {
            return Promise.resolve([min, max]);
          });
      })
      .then(minAndMax => {
        [min, max] = minAndMax;
        return Promise.resolve(normalizeInRange(min, max, sentiment));
      })
      .then(normalized => {
        return Article.update( { normalizedSentiment: normalized }, { where: { id: articleId } } )
      })
      .then(returned => {
        returned.length > 0 ? console.log('Inserted normalized sentiment for articleId:', articleId) : console.log('Did not work');
      })
      .catch(err => {
        console.error(err);
      });
}