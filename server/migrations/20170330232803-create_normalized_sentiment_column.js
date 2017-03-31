
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Articles', 'normalizedSentiment', {
      type: Sequelize.FLOAT,
      allowNull: true,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Articles', 'normalizedSentiment'),
};
