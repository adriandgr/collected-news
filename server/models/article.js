
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
    publishDate: {
      type: DataTypes.DATE,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bodyHash: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    leadImageUrl: {
      type: DataTypes.STRING,
    },
    sentiment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Article.belongsTo(models.Source, {
          foreignKey: 'sourceId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Article;
};
