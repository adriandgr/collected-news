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
    articles.forEach((article, i) => {
      if(article.pubDate) {
        normalized.push(
          {
            id: i + 1,
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
function fetchMercury(options, articleId) {

  return new Promise((resolve, reject) => {
    request(options, (err, response, b) => {
      err && console.error('Mercury failed', err);
      body = JSON.parse(b);

      if(body.word_count < 50) {
        console.log('Rejecting article (id:' + articleId + ') due to word-count');
        reject(articleId);
      }
      const story = sanitizeHTML(body.content, {
        allowedTags: [],
        allowedAttributes: []
      });
      resolve({
        source: body.domain,
        leadImgUrl: body.lead_image_url,
        content: story
      });
    });
  });

}

// Step 2 - Takes array of articles and sends them to mercury API
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

  articles.forEach((article) => {
    options.url += article.link;
    stories.push(fetchMercury(options, article.id));
    options.url = URL;
  });

  return stories;

}

function getKeywords(body) {
  keywords = g.extract(body, { score: true, limit: 5 });
  if(keywords.length === 0) {
    console.log('No keywords found');
  }
  return keywords;
}

function getSentiment(body) {
  return s(body).comparative;
}


const db = [];

const sources = [
  // 'http://rss.cnn.com/rss/cnn_topstories.rss' // XXX this source does not work
  // 'http://globalnews.ca/feed/',
  // 'http://feeds.foxnews.com/foxnews/world',
  // 'http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'
];

// Promise chain

let sample = 3;

getFeeds(sources).forEach(feed => {

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
        .catch(id => {
          // Remove rejected articles
          bodies.splice(id - 1, 1);
          return bodies;
        })
        .then(bodies => {

          Promise.all(bodies)
            .then(bodies => {

              // console.log(bodies);

              bodies.forEach((body, i) => {
                if(results[i]) {
                  results[i].id = i + 1;
                  results[i].source = body.source;
                  results[i].content = body.content;
                  results[i].leadImgUrl = body.leadImgUrl;
                  results[i].sentiment = getSentiment(body.content);
                  results[i].keywords = getKeywords(body.content);
                }
              })

              console.log('\n\nProcessed', results.length, 'articles from', results[0].source);
              results.forEach(result => {
                console.log('  =>', result.title);
              });

              // console.log(results);

              console.log('\nSample article:');
              console.log(results[sample]);
            })
            .catch(id => {
              // This catch is causing me grief
              console.log('errors w/ this id:', id);
            });

        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      // This catches anything that isn't happy
      console.error(err);
    });
});



