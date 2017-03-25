
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('KeywordSources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      keywordId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Keywords',
          key: 'id',
          as: 'keywordId',
        },
      },
      sourceId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Sources',
          key: 'id',
          as: 'sourceId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) =>
    queryInterface.dropTable('KeywordSources'),
};
