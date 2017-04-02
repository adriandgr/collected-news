'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Articles', 'leadImageUrl', {
      type: Sequelize.TEXT,
    });
    queryInterface.changeColumn('Articles', 'link', {
      type: Sequelize.TEXT,
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn('Articles', 'leadImageUrl', {
      type:Sequelize.STRING,
    });
    queryInterface.changeColumn('Articles', 'link', {
      type: Sequelize.STRING,
    });
  }
};