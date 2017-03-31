const insert = require('./insert');
const normalizeSentiment = require('./sentiment/normalize');

module.exports = entries => {

  entries.forEach(entry => {
    let keywords = entry.keywords.map(keyword => {
      return keyword;
    });
    let sentiment = entry.sentiment;
    Promise.all(insert.keywords(entry))
      .then(rows => {
        const keywordIds = rows.map(arr => {
          let [row, ] = arr;
          return row.id;
        });
        keywords.forEach((keyword, i) => {
          keyword.id = keywordIds[i];
        })
        return insert.article(entry)
          .then(arr => {
            [row, changed] = arr;
            const articleId = row.id;
            changed && console.log('Inserted new article');
            return Promise.resolve(articleId);
          })
          .then(articleId => {
            normalizeSentiment(articleId, sentiment);
            return Promise.resolve(articleId);
          })
      })
      .then(articleId => {

        return Promise.all(insert.articleKeywords(keywords, articleId));
      })
      .then(rows => {
        rows.forEach(row => {
          row[1] && console.log('Added new Article/Keyword pairings');
        });
      })
      .catch(err => {
        console.error(err);
      });
  });
};


