
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Keyword.hasMany(models.ArticleKeyword, {
          foreignKey: 'keywordId',
          as: 'articleKeywords',
        });
        Keyword.hasMany(models.KeywordSource, {
          foreignKey: 'keywordId',
          as: 'keywordSources',
        });
      },
    },
  });
  return Keyword;
};
