const rss = require('rss-parser');
const request = require('request');
const sanitizeHTML = require('sanitize-html');
g = require('gramophone');
s = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';

// Step 1 - parse RSS feeds and resolve an array of articles from each source
function getFeeds() {
  const rawFeeds = [];
  sources.forEach(source => {
    rawFeeds.push(new Promise(resolve => {
      rss.parseURL(source, (err, parsed) => {
        err && console.error(err);
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


// Actually fetches from mercury (called inside of Step 2)
function fetchMercury(options) {

  return new Promise((resolve, reject) => {
    request(options, (err, response, b) => {
      err && console.error('Mercury failed', err);
      body = JSON.parse(b);
      let wordCount = body.word_count;
      if(wordCount < 30) {
        reject(`Discarded article - ${body.url} - word count too low`);
      }
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

// Step 2 - Takes array of articles and sends them to mercury API
function getStories(articles) {

  function done() {
    console.log('Completed Mercury processing');
  }

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
    count === 0 ? done() : null;
  });

  return stories;

}

function getKeywords(body) {
  keywords = g.extract(body, { score: true, limit: 5 });
  if(keywords.length === 0) {
    throw new Error('Keywords not found')
  }
  return keywords;
}

function getSentiment(body) {
  return s(body).comparative;
}


const sources = [
  'http://rss.cnn.com/rss/cnn_world.rss',
  'http://globalnews.ca/feed/',
  'http://feeds.foxnews.com/foxnews/world',
  'http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'
];

// Promise chain

let sample = 3;

getFeeds(sources).forEach((feed, index) => {

  let results;

  feed
    .then(rawArticles => {
      return normalize(rawArticles);
    })
    .then(articles => {
      results = articles;
      return getStories(articles);
    })
    .then(bodies => {
      Promise.all(bodies)
        .then(bodies => {
          bodies.forEach((body, i) => {
            if(results[i]) {
              results[i].id = i + 1;
              results[i].source = body.source;
              results[i].content = body.content;
              results[i].leadImgUrl = body.leadImgUrl;
              results[i].sentiment = getSentiment(body.content);
              results[i].keywords = getKeywords(body.content);
            }
          });
          console.log('\n\nProcessed', results.length, 'articles from', results[0].source);
          results.forEach(result => {
            console.log('  =>', result.title);
          });
        })
        .catch(err => {
          // This will catch if mercury isn't happy
          console.error(err);
        });
    })
    .catch(err => {
      // This catches anything that isn't happy
      console.error(err);
    });
});



