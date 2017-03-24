'use strict';
module.exports = function(sequelize, DataTypes) {
  var ArticleKeyword = sequelize.define('ArticleKeyword', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ArticleKeyword;
};