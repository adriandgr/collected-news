const insertInto = require('./insert');
const normalizeSentiment = require('./sentiment/normalize');

function normalizeSentiments() {

}

function insert(entry) {
  const keywords = entry.keywords.map(keyword => {
    return keyword;
  });
  const sentiment = entry.sentiment;
  Promise.all(insertInto.keywords(entry))
    .then(rows => {
      const keywordIds = rows.map(arr => {
        [row, ] = arr;
        return row.id;
      });
      keywords.forEach((keyword, i) => {
        keyword.id = keywordIds[i];
      })
      return insertInto.article(entry)
        .then(arr => {
          [row, changed] = arr;
          const articleId = row.id;
          changed && console.log('Inserted new article');
          return Promise.resolve(articleId);
        })
        .then(articleId => {
          return Promise.resolve(articleId);
        })
    })
    .then(articleId => {
      return Promise.all(insertInto.articleKeywords(keywords, articleId));
    })
    .then(rows => {
      rows.forEach(row => {
        [, success] = row;
        success && console.log('Added new Article/Keyword pairings');
      });
    });
}

function insertIntoDatabase(entries) {
  entries.forEach(entry => {
    insert(entry);
  });
}

module.exports = entries => {
  return Promise.resolve(insertIntoDatabase(entries));
};


