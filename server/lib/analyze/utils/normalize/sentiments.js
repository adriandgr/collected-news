const {Article} = require('../../../../models');

function normalizeInRange(min, max, articleIdsAndsentiments) {
  const normalized = [];
  let score = 0;
  articleIdsAndSentiments.forEach(row => {
    [articleId, sentiment] = row;
    score = (2 * ((sentiment - min) / (max - min)) - 1);
    normalized.push([articleId, score]);
  });
  return normalized;
}

function getSentiments() {
  return Article.all({ attributes: ['id', 'sentiment'] })
  .then(instances => {
    const sentiments = [];
    instances.forEach(instance => {
      articleId = instance.dataValues.id;
      sentiment = instance.dataValues.sentiment
      sentiments.push([articleId, sentiment]);
    });
    return Promise.resolve(sentiments);
  });
}

function insert(articleIdsAndNormalizedSentiments) {
  const insertions = [];
  articleIdsAndNormalizedSentiments.forEach(row => {
    [articleId, normalizedSentiment] = row;
    insertions.push(
      Article.update(
        { normalizedSentiment: normalizedSentiment },
        { where: { id: articleId } }
      )
    );
  });
  return Promise.all(insertions);
}

module.exports = () => {
  return Article.aggregate('sentiment', 'min')
      .then(min => {
        return Article.aggregate('sentiment', 'max')
          .then(max => {
            return Promise.resolve([min, max]);
          });
      })
      .then(minAndMax => {
        return getSentiments()
                .then(articleIdsAndSentiments => {
                  return Promise.resolve([minAndMax, articleIdsAndSentiments])
                });
      })
      .then(minAndMaxAndArticleIdsAndSentiments => {
        [minAndMax, articleIdsAndSentiments] = minAndMaxAndArticleIdsAndSentiments;
        [min, max] = minAndMax;
        return Promise.resolve(normalizeInRange(min, max, articleIdsAndSentiments));
      })
      .then(normalized => {
        return insert(normalized);
      })
      .then(returned => {
        const attempts = returned.length;
        let successes = 0;
        returned.forEach(entry => {
          entry[0] === 1 && successes++;
        })
        console.log(successes, 'out of', attempts, 'normalized sentiments were successfully updated');
      })
      .catch(err => {
        console.error(err);
      });
}