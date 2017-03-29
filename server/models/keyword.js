
module.exports = (sequelize, DataTypes) => {
  const Keyword = sequelize.define('Keyword', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Keyword.hasMany(models.KeywordSource, {
          foreignKey: 'keywordId',
          as: 'keywordSources',
        });
        Keyword.belongsToMany(models.Article, {
          through: 'ArticleKeywords',
          foreignKey: 'keywordId'
        })
      },
    },
  });
  return Keyword;
};
