
module.exports = (sequelize) => {
  const ArticleKeyword = sequelize.define('ArticleKeyword', {

  }, {
    classMethods: {
      associate: (models) => {
        ArticleKeyword.belongsTo(models.Article, {
          foreignKey: 'articleId',
          onDelete: 'CASCADE',
        });
        ArticleKeyword.belongsTo(models.Keyword, {
          foreignKey: 'keywordId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return ArticleKeyword;
};
