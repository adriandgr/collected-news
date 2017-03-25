
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Articles', 'snippet', {
      type: Sequelize.TEXT,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Articles', 'snippet'),
};
