
module.exports = (sequelize, DataTypes) => {
  const KeywordSource = sequelize.define('KeywordSource', {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return KeywordSource;
};
