
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Sources', [{
      name: 'Fox News',
      link: 'http://feeds.foxnews.com/foxnews/world',
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('Sources', null, {}),
};
