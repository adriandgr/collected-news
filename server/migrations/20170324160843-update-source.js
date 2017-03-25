
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Sources', 'description', {
      type: Sequelize.STRING,
    });
  },

  down: (queryInterface) =>
    queryInterface.removeColumn('Sources', 'description'),
};
