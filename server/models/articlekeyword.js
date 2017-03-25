
module.exports = (sequelize, DataTypes) => {
  const ArticleKeyword = sequelize.define('ArticleKeyword', {
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
