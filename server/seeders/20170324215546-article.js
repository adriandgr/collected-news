
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Articles', [{
      title: 'Death toll in Guatemala shelter fire rises to 41',
      pubDate: 'Fri, 24 Mar 2017 21:53:16 GMT',
      link: 'http://feeds.foxnews.com/~r/foxnews/world/~3/VXnhYHGIbE0/death-toll-in-guatemala-shelter-fire-rises-to-41.html',
      leadImageUrl: 'http://a57.foxnews.com/images.foxnews.com/content/fox-news/world/2017/03/24/death-toll-in-guatemala-shelter-fire-rises-to-41/_jcr_content/par/featured-media/media-0.img.jpg/0/0/1490392880998.jpg?ve=1',
      snippet: `The death toll in a fire at a Guatemalan children\'s shelter has risen to 41 after
      another girl died of her injuries.`,
      content: `FILE - In this March 8, 2017 file photo, National Police guard the entrance to the
        Virgen de la Asuncion Safe Home, in San Jose Pinula, Guatemala. In November, a state human
        rights prosecutor filed a complaint with the Inter American Human Rights Commission
        charging rampant abuses at the shelter. The accusations included charges as serious as
        &quot;forced recruitment for human trafficking for the purpose of prostitution.&quot;
        (AP Photo/Luis Soto, File)  (The Associated Press)
        GUATEMALA CITY –  The death toll in a fire at a Guatemalan children\'s shelter has risen
        to 41 after another girl died of her injuries. The attorney general\'s office said Friday
        the girl died after being transferred for treatment to a hospital in Cincinnati, Ohio.
        She was one of nine girls transferred for treatment to   hospitals in the United States.
        Nineteen of the adolescents perished at the scene of the March 8 fire and 22 others have
        died at hospitals. The fire began when mattresses were set ablaze during a protest by
        residents at the overcrowded youth shelter. Guatemalan authorities have arrested three
        former child welfare officials who were responsible for overseeing the youth shelter.`,
      sentiment: -0.13063063063063063,
      sourceId: 1,
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('Sources', null, {}),
};
