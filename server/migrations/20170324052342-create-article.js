
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
      },
      pubDate: {
        type: Sequelize.DATE,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contentHash: {
        type: Sequelize.STRING,
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
      link: {
        type: Sequelize.TEXT,
      },
      leadImageUrl: {
        type: Sequelize.TEXT,
      },
      sentiment: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    queryInterface.dropTable('Articles'),
};
