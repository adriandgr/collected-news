const Keyword = require('../../../models').Keyword;
const Article = require('../../../models').Article;
const ArticleKeyword = require('../../../models').ArticleKeyword

module.exports = {
  keywords: entry => {
    const container = [];
    console.log(entry);
    entry.keywords.forEach(keyword => {
      container.push(Promise.resolve(
        Keyword.findOrCreate({
          where: {
            name: keyword.keyword
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
        link: entry.link,
        sourceId: entry.sourceId
      },
      defaults: {
        leadImageUrl: entry.leadImgUrl,
        pubDate: entry.pubDate,
        snippet: entry.snippet,
        content: entry.content,
        sentiment: entry.sentiment,
      }
    });
  },
  articleKeywords: (keywords, articleId) => {
    const container = [];
    keywords.forEach(keyword => {
      container.push(Promise.resolve(
        ArticleKeyword.create({
          keywordId: keyword.id,
          articleId: articleId,
          frequency: keyword.tf
        }
      )));
    });
    return container;
  }
}