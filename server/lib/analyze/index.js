const [...sources] = require('./sources');
const rss = require('./utils/rss');
// const rss = require('rss-parser');
const request = require('request');
const sanitize = require('sanitize-html');
gramophone = require('gramophone');
sentiment = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';

function clean(content) {
  return sanitize(content, { allowedTags: [], allowedAttributes: [] } )
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, '')
    .replace(/&.{4};/g, ' ');
}

// Actually fetches from mercury (called inside of Step 2)
function getContent(options, entry) {

  return new Promise((resolve, reject) => {

    request(options, (err, response, body) => {

      let incoming = JSON.parse(body) || 0;

      if(err || !incoming || !incoming.content) {
        console.log('rejecting');
        reject( { description: 'Mercury failed', data: { trace: err, entry: entry } } );
      }

      let content = clean(incoming.content);

      // TODO
      // Make this less hacky; there has got to be a better way
      if(!incoming.word_count || incoming.word_count < 250) {
        resolve({
          success: false,
          id: entry.id,
          wordCount: incoming.word_count
        });
      }

      resolve({
        success: true,
        source: incoming.domain,
        leadImgUrl: incoming.lead_image_url,
        content: content,
        wordCount: incoming.word_count
      });

    });
  });

}


// Step 2 - Takes array of articles and sends them to mercury API

function getArticles(entries) {

  let URL = 'https://mercury.postlight.com/parser?url=';

  let options = {
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MERCURY_API_KEY
    }
  };

  let articles = [];

  entries.forEach(entry => {
    options.url += entry.link;
    articles.push(getContent(options, entry));
    options.url = URL;
  });

  return articles;

}

function getKeywords(article) {
  keywords = gramophone.extract(article.content, { score: true, limit: 5 });
  if(keywords.length === 0) {
    console.log('\nNo keywords found');
    console.log('Debug');
    console.log(' => word count:', article.wordCount);
    console.log(' => success:', article.success + '\n');
  }
  return keywords;
}

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
      console.log(`\n\nFound ${entries.length} entries from feed`);
      return rss.normalize(entries);
    })
    .then(entries => {
      Promise.all(getArticles(entries))
        .then(data => {
          console.log(`Processed ${data.length} entries via Mercury`);
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
          console.log(n, 'instances of bad data after guard');
          return data;
        })
        .then(data => {
          data.forEach((article, i) => {
            entries[i].source = article.source;
            entries[i].content = article.content;
            entries[i].leadImgUrl = article.leadImgUrl;
            entries[i].sentiment = sentiment(article.content).comparative;
            entries[i].keywords = getKeywords(article);
          });

          console.log(entries[sample]);

          console.log('All done');
          pending--;
          if(!pending) {
            let end = Date.now();
            console.log(`Process took: ${(end - start) / 1000} seconds`);
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
