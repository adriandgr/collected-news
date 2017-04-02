const dotenv          = require('dotenv').config();
const getFeeds        = require('./sources');
const analyze         = require('./utils/analysis');
const mercury         = require('./utils/mercury')(process.env.MERCURY_API_KEY);
const rss             = require('./utils/rss');
const insert          = require('./db');

// Pick an index to sample
const sample = 3;

getFeeds(feeds => {
  rss.parse(feeds).forEach(feed => {
    feed
      .then(data => {
        return rss.normalize(data);
      })
      .then(entries => {
        mercury.resolve(entries)
          .then(data => {

            // Remove bad data
            let i = data.length;
            while(i--) {
              if(!data[i].success) {
                data.splice(i, 1);
                entries.splice(i, 1);
              }
            }

            // Add to entries object
            data.forEach((article, i) => {
              entries[i].source = article.source;
              entries[i].content = JSON.stringify(article.content.paragraphs);
              entries[i].leadImgUrl = article.leadImgUrl;
              entries[i].sentiment = analyze.sentiment(article);
              entries[i].keywords = analyze.keywords(article);
            });

            console.log('Scraped and proccessed data from source:', entries[sample].source);
            return Promise.resolve(entries);
          })
          .then(entries => {
            Promise.resolve(insert(entries));
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.log('Final catch');
        err.description ? console.log(err.description) : console.log(err);
      });
  });
});
