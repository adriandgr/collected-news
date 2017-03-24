
module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Source.hasMany(models.Article, {
          foreignKey: 'sourceId',
          as: 'articles',
        });
        Source.hasMany(models.KeywordSource, {
          foreignKey: 'sourceId',
          as: 'keywordSources',
        });
      },
    },
  });
  return Source;
};
