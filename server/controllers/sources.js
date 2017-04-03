const Source = require('../models').Source;
const Article = require('../models').Article;
const {sequelize} = require('../models');

module.exports = {
  index(req, res) {
    return sequelize.query(`
      SELECT
        "Sources".*,
        COUNT("Articles"."id") AS "total_articles",
        AVG("Articles"."sentiment") AS avg_sentiment
      FROM
        "Sources"
      JOIN
        "Articles"
      ON
        "Sources"."id" = "Articles"."sourceId"
      GROUP BY
        "Sources"."name",
        "Sources"."id"
      ORDER BY
        avg_sentiment DESC
    `)
    //
    .then(sourcesWithAnalytics => {
      [sources, ] = sourcesWithAnalytics;
      Article.all({
        attributes: [
          ['sourceId', 'id'],
          [ sequelize.fn('max', sequelize.col('pubDate')), 'latest_article' ]
        ],
        where: ['"pubDate" is not null'],
        group: [ 'sourceId' ]
      })
      .then(mostRecentArticlesForSources => {
        sources.forEach(source => {
          mostRecentArticlesForSources.forEach(instance => {
            if(source.id === instance.dataValues.id) {
              source.latestArticle = instance.dataValues.latest_article;
            }
          });
        });
        res.json(sources);
      });
    })
    .catch(err => {
      console.error(err);
    });
  },
  individual(req, res) {
    const id = req.params.id;
    return Article.all({
      where: [`"sourceId" = ${id}`],
      order: '"pubDate" DESC'
    })
      .then(articles => res.json(articles))
      .catch(err => console.error(err));
  }
};
