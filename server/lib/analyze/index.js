const rss = require('rss-parser');
const request = require('request');
const sanitizeHTML = require('sanitize-html');
g = require('gramophone');
s = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';

let results = [];

const sources = [
  'http://rss.cnn.com/rss/cnn_world.rss',
  'http://globalnews.ca/feed/'
  // 'http://feeds.foxnews.com/foxnews/world',
  // 'http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'
];

// Step 1 - parse RSS feeds and resolve an array of articles from each source
function getFeeds() {
  const feeds = [];
  sources.forEach((source) => {
    feeds.push(new Promise(resolve => {
      rss.parseURL(source, (err, parsed) => {
        err && console.error(err);
        if(parsed.feed.title) {
          console.log('\n\n');
          console.log(parsed.feed.title);
          resolve( { title: parsed.feed.title, articles: parsed.feed.entries } );
        } else {
          console.error('\n\nFound no RSS Feed title');
          resolve( { title: '', articles: parsed.feed.entries } );
        }
      });
    }));
  });
  return feeds;
}

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
      resolve( { leadImgUrl: leadImgUrl, content: story } );
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
  keywords.length === 0 ? console.error('Gramophone failed to find keywords') : null;

  return keywords;
}

function getSentiment(body) {
  return s(body).comparative;
}

function populateInitial(articles) {
  results = articles;
}

function populate(props) {
  Object.keys(props).forEach(key => {
    props[key].forEach((value, i) => {
      results[i][key] = value;
    });
  });
}

let idx = 3;

for (let feed of getFeeds(sources)) {

  feed
    .then(rawArticles => {
      console.log('  => sample: ');
      console.log('\n');
      console.log(rawArticles[idx]);
      console.log('\n\n');
      return normalize(rawArticles);
    })
    .then(articles => {
      console.log('Normalized data from feed');
      console.log(' => sample:');
      console.log('\n');
      console.log(articles[idx]);
      populateInitial(articles);
      return getStories(articles);
    })
    .then(bodies => {
      Promise.all(bodies)
        .then(bodies => {

          bodies.forEach((body, i) => {
            results[i].content = body.content;
            results[i].leadImgUrl = body.leadImgUrl;
            results[i].sentiment = getSentiment(body.content);
            results[i].keywords = getKeywords(body.content);
          });

          console.log('\n\n Final results');
          console.log(results[idx]);

        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
}


