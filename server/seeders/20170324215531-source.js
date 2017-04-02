
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Sources', [{
      name: 'Fox News',
      link: 'http://feeds.foxnews.com/foxnews/world',
      createdAt: Sequelize.literal("(now() at time zone 'utc')"),
      updatedAt: Sequelize.literal("(now() at time zone 'utc')"),
    }
    ]),
  down: (queryInterface) =>
    queryInterface.bulkDelete('Sources', null, {}),
};




/*
http://feeds.foxnews.com/foxnews/latest
http://feeds.foxnews.com/foxnews/tech
http://feeds.foxnews.com/foxnews/world

http://feeds.reuters.com/reuters/technologyNews?format=xml

http://www.slate.com/all.fulltext.all.rss

http://rss.cbc.ca/lineup/topstories.xml

http://rss.cbc.ca/lineup/canada.xml
http://rss.cbc.ca/lineup/technology.xml
http://rss.cbc.ca/lineup/canada-britishcolumbia.xml

http://globalnews.ca/feed/rss2/

http://www.metronews.ca/feeds.articles.news.vancouver.rss

http://www.straight.com/content/rss

http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml
http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/technology/rss.xml

http://theverge.com/rss/index.xml

http://wired.com/?feed=rss2

http://news.harker.org/?feed=rss2




*/


















