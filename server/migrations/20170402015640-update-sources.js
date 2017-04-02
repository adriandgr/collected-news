
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Sources', 'logoLink', {
      type: Sequelize.TEXT,
    }),

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'logoLink'),
};
