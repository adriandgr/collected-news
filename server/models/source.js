'use strict';
module.exports = function(sequelize, DataTypes) {
  var Source = sequelize.define('Source', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Source;
};