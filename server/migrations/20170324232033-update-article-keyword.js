
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('ArticleKeywords', 'frequency', {
      type: Sequelize.INTEGER,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('ArticleKeywords', 'frequency'),
};
