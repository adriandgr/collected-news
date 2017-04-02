
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Sources', 'category', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'category'),
};
