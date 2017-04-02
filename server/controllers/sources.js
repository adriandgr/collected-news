const Source = require('../models').Source;
const Article = require('../models').Article;
const {sequelize} = require('../models');

module.exports = {
  index(req, res) {
    return Article.all({
      include: [ Source ],
      attributes: [[ sequelize.fn('avg', sequelize.col('sentiment')), 'avg_sentiment' ]],
      order: 'avg_sentiment DESC',
      group: [
        'Article.sourceId',
        'Article.id',
        'Source.id'
      ]
     })
    .then(articlesWithAverageSentiment => {
      res.json(articlesWithAverageSentiment);
    })
    .catch(err => {
      console.error(err);
    });
  },
  individual(req, res) {
    const id = req.params.id;
    return Source
      .findById(id)
      .then(source => res.json(source))
      .catch(err => console.error(err));
  }
};
