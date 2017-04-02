
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Sources', 'language', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'language'),
};
