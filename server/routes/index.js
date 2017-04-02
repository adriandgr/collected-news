const articleKeywordsController = require('../controllers').articleKeywords;
const articlesController = require('../controllers').articles;
const keywordsController = require('../controllers').keywords;
const keywordSourcesController = require('../controllers').keywordSources;
const sourcesController = require('../controllers').sources;


module.exports = (app) => {
  app.use((req, res, next) => {
    // TODO: REMOVE THIS CORS RULE IN PRODUCTION!!! this is not secure
    res.header('Access-Control-Allow-Origin', '*')
    Promise.resolve(next()).catch((ex) => {
      // handle error
      res.status(400);
      res.send(ex.message);
    });
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // Sources
  app.get('/api/sources', sourcesController.index); // lists all sources ordered by id
  app.get('/api/sources/:id', sourcesController.individual);

  // Keywords
  app.get('/api/keywords', keywordsController.index); // limits top 6 keywords ordered by frequency relationship to articles
  app.get('/api/keywords/all', keywordsController.all); // list all keywords
  app.get('/api/keywords/:keyword', keywordsController.individual); // api endpoint for search by keyword

  // Articles
  app.get('/api/articles', articlesController.index); // not yet build >> TODO
  app.get('/api/articles/all', articlesController.all); // returns all article metadata for search indexing purposes
  app.get('/api/articles/:id', articlesController.individual);

  app.all('/api', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
