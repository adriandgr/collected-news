
module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define('Source', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    logoLink: DataTypes.TEXT,
    category: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING,
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
