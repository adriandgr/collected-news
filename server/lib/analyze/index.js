const dotenv          = require('dotenv').config();
const getFeeds        = require('./sources');
const analyze         = require('./utils/analysis');
const mercury         = require('./utils/mercury')(process.env.MERCURY_API_KEY);
const rss             = require('./utils/rss');
const db              = require('./db');

// Pick an index to sample
const sample = 3;

getFeeds((feeds, pending) => {
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
            let n = 0;
            while(i--) {
              if(!data[i].success) {
                data.splice(i, 1);
                entries.splice(i, 1);
                n++;
              }
            }

            // Add to entries object
            data.forEach((article, i) => {
              entries[i].source = article.source;
              entries[i].content = article.content;
              entries[i].leadImgUrl = article.leadImgUrl;
              entries[i].sentiment = analyze.sentiment(article);
              entries[i].keywords = analyze.keywords(article);
            });

            db(entries);

            if(pending--) {
              console.log('Completed scrape');
            }

            })
            .catch(err => {
              pending--;
              console.log('Promise.all catch');
              console.error(err);
            });
      })
      .catch(err => {
        console.log('Final catch');
        err.description ? console.log(err.description) : console.log(err);
      });
  });
});
