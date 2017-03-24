const sourcesController = require('../controllers').sources;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  app.post('/api/sources', sourcesController.create);
  app.get('/api/sources', sourcesController.list);


  app.all('/api', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
