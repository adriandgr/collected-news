
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Not found',
    },
    pubDate: {
      type: DataTypes.DATE,
    },
    snippet: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contentHash: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    leadImageUrl: {
      type: DataTypes.STRING,
    },
    sentiment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    normalizedSentiment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Article.belongsTo(models.Source, {
          foreignKey: 'sourceId',
          onDelete: 'CASCADE',
        });
        Article.belongsToMany(models.Keyword, {
          through: 'ArticleKeywords',
          foreignKey: 'articleId',
        })
      },
    },
  });
  return Article;
};
