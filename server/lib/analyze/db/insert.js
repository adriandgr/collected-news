const Keyword = require('../../../models').Keyword;
const Article = require('../../../models').Article;
const ArticleKeyword = require('../../../models').ArticleKeyword

module.exports = {
  keywords: entry => {
    console.log(entry);
    const container = [];
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
    return Article.create({
      title: entry.title,
      pubDate: entry.pubDate,
      link: entry.link,
      leadImageUrl: entry.leadImgUrl,
      snippet: entry.snippet,
      content: entry.content,
      sentiment: entry.sentiment,
      sourceId: entry.sourceId
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