const rss = require('rss-parser');
const request = require('request');
const sanitizeHTML = require('sanitize-html');
g = require('gramophone');
s = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';

let feeds = [];

const sources = [
  'http://rss.cnn.com/rss/cnn_world.rss',
  'http://globalnews.ca/feed/'
  // 'http://feeds.foxnews.com/foxnews/world',
  // 'http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'
];

// Step 1 - parse RSS feeds and resolve an array of articles from each source
function getFeeds() {
  const rawFeeds = [];
  sources.forEach(source => {
    rawFeeds.push(new Promise(resolve => {
      rss.parseURL(source, (err, parsed) => {
        err && console.error(err);
        if(parsed.feed.title) {
          console.log('\n\n');
          console.log(parsed.feed.title);
        } else {
          console.error('\n\nRSS Feed (title not found)');
        }
        console.log('Found:', parsed.feed.entries.length, 'articles\n');
        resolve(parsed.feed.entries);
      });
    }));
  });
  return rawFeeds;
}


// Parses each article's data and makes it nicer to deal w/
function normalize(articles) {
  normalized = [];
  return new Promise((resolve, reject) => {
    articles.forEach(article => {
      if(article.pubDate) {
        normalized.push(
          {
            title: article.title,
            link: article.link,
            pubDate: article.pubDate,
            snippet: article.contentSnippet
          }
        );
        resolve(normalized);
      } else {
        reject('Discarding article w/out published date');
      }
    });
  });
}


// (called inside of Step 2)
function fetchMercury(options) {

  return new Promise(resolve => {
    request(options, (err, response, b) => {
      err && console.error('Mercury failed', err);
      body = JSON.parse(b);
      const story = sanitizeHTML(body.content, {
        allowedTags: [],
        allowedAttributes: []
      });
      const leadImgUrl = body.lead_image_url;
      const source = body.domain;
      resolve( {
        source: source,
        leadImgUrl: leadImgUrl,
        content: story } );
    });
  });

}

// Step 2 - take articles and send to mercury API
function getStories(articles) {


  let URL = 'https://mercury.postlight.com/parser?url=';
  let options = {
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MERCURY_API_KEY
    }
  };

  let stories = [];
  let count = articles.length;

  articles.forEach((article) => {
    options.url += article.link;
    stories.push(fetchMercury(options));
    options.url = URL;
    count--;
    count === 0 ? console.log('Completed individual scrape from Mercury') : null;
  });

  return stories;

}

function getKeywords(body) {
  keywords = g.extract(body, { score: true, limit: 5 });

  // Fail moostly silently for now
  keywords.length === 0 ? keywords = ['Keywords not found'] : null;

  return keywords;
}

function getSentiment(body) {
  return s(body).comparative;
}

// function populate(props) {
//   Object.keys(props).forEach(key => {
//     props[key].forEach((value, i) => {
//       feeds[i][key] = value;
//     });
//   });
// }

let sample = 3;

for (let feed of getFeeds(sources)) {

  feed
    .then(rawArticles => {
      // console.log('  => sample: ');
      // console.log('\n');
      // console.log(rawArticles[idx]);
      // console.log('\n\n');
      return normalize(rawArticles);
    })
    .then(articles => {
      // console.log('Nomralized data from feed');
      // console.log(' => sample:');
      // console.log('\n');
      // console.log(articles[idx]);
      feeds.push(articles);
      // console.log(articles);
      // console.log(feeds[idx]);
      return getStories(articles);
    })
    .then(bodies => {

      Promise.all(bodies)
        .then(bodies => {

          // feeds.forEach((feed, fI) => {
          //   console.log(fI);
          //   bodies.forEach((body, yI) => {
          //     feeds[fI][yI].source = body.source;
          //     feeds[fI][yI].content = body.content;
          //     feeds[fI][yI].leadImgUrl = body.leadImgUrl;
          //     feeds[fI][yI].sentiment = getSentiment(body.content);
          //     feeds[fI][yI].keywords = getKeywords(body.content);
          //   });
          // });

          // console.log( feeds[0][sample]);

          // bodies.forEach((body, i) => {
          //   if(results[i]) {
          //     // console.log(results[i]);
          //     results[i].id = i;
          //     results[i].source = body.source;
          //     results[i].content = body.content;
          //     results[i].leadImgUrl = body.leadImgUrl;
          //     results[i].sentiment = getSentiment(body.content);
          //     results[i].keywords = getKeywords(body.content);
          //   }
          // });

          // console.log('\n\n Final results\n');
          // console.log(results[idx]);

          // console.log(results[0]);

        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
}


