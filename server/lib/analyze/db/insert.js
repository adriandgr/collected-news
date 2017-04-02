const {Keyword} = require('../../../models');
const {Article} = require('../../../models');
const {ArticleKeyword} = require('../../../models');


module.exports = {
  keywords: entry => {
    const container = [];
    entry.keywords.forEach(keyword => {
      container.push(Promise.resolve(
        Keyword.findOrCreate({
          where: {
            name: keyword.term
          }
        }
      )));
    })
    return container;
  },
  article: entry => {
    return Article.findOrCreate({
      where: {
        title: entry.title,
        link: entry.url,
        sourceId: entry.sourceId
      },
      defaults: {
        leadImageUrl: entry.leadImgUrl,
        author: entry.author,
        pubDate: entry.publishedAt,
        snippet: entry.description,
        content: entry.content,
        sentiment: entry.sentiment,
      }
    });
  },
  articleKeywords: (keywords, articleId) => {
    const container = [];
    keywords.forEach(keyword => {
      container.push(Promise.resolve(
        ArticleKeyword.findOrCreate({
          where: {
            keywordId: keyword.id,
            articleId: articleId,
          },
          defaults: {
            frequency: keyword.tf
          }
        }
      )));
    });
    return container;
  }
}