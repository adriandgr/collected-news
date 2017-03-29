const {sequelize, Keyword, Article, ArticleKeyword} = require('../../models');

module.exports = {
  getData: callback => { sequelize.query(
    `SELECT DISTINCT ON(rel, popular_keywords.name)
        a.*,
        popular_keywords.name,
        popular_keywords.rel
    FROM "Articles" a
        JOIN "ArticleKeywords" akk ON a.id = akk."articleId"
        JOIN
            (SELECT
                COUNT(ak."keywordId") AS rel,
                k.id,
                k.name
            FROM "Keywords" k
            JOIN
                "ArticleKeywords" ak ON
                ak."keywordId" = k.id
            GROUP BY k.id, k.name Order By rel DESC
            LIMIT 6)
        popular_keywords ON popular_keywords.id = akk."keywordId"
        ORDER BY rel DESC, popular_keywords.name`,
    {type: sequelize.QueryTypes.SELECT})
    .then(results => {
      callback(results);
    })
    .catch(err => {
      console.error(err);
    })
  }
}