
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
      publishDate: {
        type: Sequelize.DATE,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bodyHash: {
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
      url: {
        type: Sequelize.STRING,
      },
      leadImageUrl: {
        type: Sequelize.STRING,
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
