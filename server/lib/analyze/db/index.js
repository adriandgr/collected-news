const insert = require('./insert');

module.exports = entries => {
  entries.forEach(entry => {
    let n = 0;
    let keywords = entry.keywords.map(keyword => {
      return keyword;
    });
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
            changed ? console.log('Inserted new article') : console.log('Duplicate article found');
            return Promise.resolve(articleId);
          });
      })
      .then(articleId => {
        return Promise.all(insert.articleKeywords(keywords, articleId));
      })
      .then(rows => {
        const articleKeywordsIds = rows.map(row => { return row.id })
      })
      .catch(err => {
        console.error(err);
      });
  });
};


