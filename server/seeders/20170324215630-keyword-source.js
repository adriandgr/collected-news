
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('KeywordSources', [{
      keywordId: 1,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }, {
      keywordId: 2,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }, {
      keywordId: 3,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }, {
      keywordId: 4,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }, {
      keywordId: 5,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('KeywordSources', null, {}),
};
