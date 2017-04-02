
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Sources', 'country', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'country'),
};
