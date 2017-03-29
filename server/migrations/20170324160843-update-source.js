
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Sources', 'description', {
      type: Sequelize.TEXT,
    });
  },

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'description'),
};
