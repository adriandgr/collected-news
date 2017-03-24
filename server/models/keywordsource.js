
module.exports = (sequelize) => {
  const KeywordSource = sequelize.define('KeywordSource', {

  }, {
    classMethods: {
      associate: (models) => {
        KeywordSource.belongsTo(models.Keyword, {
          foreignKey: 'keywordId',
          onDelete: 'CASCADE',
        });
        KeywordSource.belongsTo(models.Source, {
          foreignKey: 'sourceId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return KeywordSource;
};
