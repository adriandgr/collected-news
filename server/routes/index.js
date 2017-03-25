const articleKeywordsController = require('../controllers').articleKeywords;
const articlesController = require('../controllers').articles;
const keywordsController = require('../controllers').keywords;
const keywordSourcesController = require('../controllers').keywordSources;
const sourcesController = require('../controllers').sources;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  app.post('/api/sources', sourcesController.create);
  app.get('/api/sources', sourcesController.list);

  app.post('/api/sources/:sourceId/articles/:articleId/', articleKeywordsController.create);
  app.post('/api/sources/:sourceId/articles', articlesController.create);
  app.post('/api/keywords', keywordsController.create);
  app.post('/api/sources', keywordSourcesController.create);

  app.all('/api', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
