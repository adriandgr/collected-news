const [...sources] = require('./sources');
const rss = require('./utils/rss');
const mercuryInstance = require('./utils/mercury');
g = require('gramophone');
s = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';
const mercury = new mercuryInstance(MERCURY_API_KEY);


const analyze = {

  keywords: article => {
    keywords = g.extract(article.content, { score: true, limit: 5 });
    if(keywords.length === 0) {
      console.log('\nNo keywords found');
      console.log('Debug');
      console.log(' => word count:', article.wordCount);
      console.log(' => success:', article.success + '\n');
    }
    return keywords;
  },

  sentiment: article => {
    return s(article.content).comparative;
  }

};


// Promise chain

const sample = 3;

let pending = sources.length;
const start = Date.now();
const totalTime = [];

let feeds = rss.parse(sources);

feeds.forEach(feed => {

  let returns;

  feed
    .then(entries => {
      console.log(`\nFound ${entries.length} entries from feed`);
      return rss.normalize(entries);
    })
    .then(entries => {
      mercury.resolve(entries)
        .then(data => {
          console.log(`\nProcessed ${data.length} entries via Mercury`);
          if(entries.length !== data.length) {
            // TODO: Handle this
            console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+**+*+*+*+**+**+*+*+*+**+*+**+');
            console.log('Found discrepancy between number of parsed feed entries and number of parsed articles');
            console.log('+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**+*+*+*+*+*+**+*+*+*+**+**+*+*+*+**+*+**+');
            throw 'a fit';
          }
          // Remove bad data
          let i = data.length;
          let n = 0;
          while(i--) {
            if(!data[i].success) {
              data.splice(i, 1);
              entries.splice(i, 1);
              n++
            }
          }
          console.log(`Removed ${n} articles due to bad data`);
          return data;
        })
        .then(data => {
          // For sake of sanity, a debug: check if there are any bad data still
          let n = 0;
          data.forEach(article => {
            if(!article.success) {
              n++;
            }
          });
          console.log(`${n} instances of bad data after guard\n`);
          return data;
        })
        .then(data => {
          data.forEach((article, i) => {
            entries[i].source = article.source;
            entries[i].content = article.content;
            entries[i].leadImgUrl = article.leadImgUrl;
            entries[i].sentiment = analyze.sentiment(article);
            entries[i].keywords = analyze.keywords(article);
          });

          console.log(`${entries[sample].source} - completed processing`);
          console.log(`  Sample:`);
          console.log(`    => Title: ${entries[sample].title}`);
          console.log(`    => Date: ${entries[sample].pubDate}`);
          console.log(`    => Snippet: ${entries[sample].snippet}`);
          console.log(`    => Sentiment: ${entries[sample].sentiment}`);
          entries[sample].keywords.forEach(keyword => {
            console.log(`    => Keyword: ${keyword.keyword} [${keyword.tf}]`);
          });

          pending--;
          if(!pending) {
            let end = Date.now();
            console.log(`\nProcess took: ${(end - start) / 1000} seconds`);
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
