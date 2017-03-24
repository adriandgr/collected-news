// rss = require('./utils/rss');
keywords = require('./utils/keywords');
sentiment = require('./utils/sentiment');

const rss = require('rss-parser');
const request = require('request');
sanitizeHTML = require('sanitize-html');
g = require('gramophone');
s = require('sentiment');



// Step 1 - parse RSS feeds and get an array of articles from each source
function getFeeds() {
  const feeds = [];
  sources.forEach((source, index) => {
    feeds.push(new Promise(resolve => {
      rss.parseURL(source, (err, parsed) => {
        console.log('Parsed RSS for', source, ' => next: Step 2');
        err && console.error(err);
        resolve(parsed.feed.entries);
      });
    }));
  });
  return feeds;
}

function normalize(articles) {
  normalized = [];

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
    } else {
      console.error('Discarding article w/out publish date');
    }
  });
  return normalized;
}


// (called inside of Step 2)
function fetchMercury(options) {

  request(options, (err, response, b) => {
    err && console.error('Mercury failed', err);
    body = JSON.parse(b);
    const story = sanitizeHTML(body.content, {
      allowedTags: [],
      allowedAttributes: []
    });
    console.log('  => Article processed');
    return story;
  });

}

// Step 2 - take articles and send to mercury API
function getStories(articles) {

  let URL = 'https://mercury.postlight.com/parser?url=';
  let options = {
    url: URL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19'
    }
  };

  let stories = [];

  articles.forEach((article, i) => {
    options.url += article.link;
    stories.push(new Promise(resolve => {
      request( options, (err, response, b) => {
        err && console.error('Mercury failed', err);
        body = JSON.parse(b);
        const story = sanitizeHTML(body.content, {
          allowedTags: [],
          allowedAttributes: []
        });
        console.log('  => Article processed');
        resolve(story);
      });
    }));
    options.url = URL;
  });

  return stories;
}

function getKeywords(stories) {
  let keywords = [];
  stories.forEach(story => {
    keywords.push(g.extract(story, { score: true, limit: 5 }));
    keywords.length === 0 ? err(new Error('Gramophone failed to find keywords')) : null;
  });
  return keywords;
}

function getSentiment(stories) {
  let sentiments = [];
  stories.forEach(story => {
    sentiments.push(s(story).comparative);
  });
  return sentiments;
}

const sources = [
  // 'http://rss.cnn.com/rss/cnn_world.rss'
  // 'http://globalnews.ca/feed/',
  'http://feeds.foxnews.com/foxnews/world'
  // 'http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009'
];


getFeeds(sources).forEach(feed => {

  feed
    .then(rawArticles => {
      console.log(normalize(rawArticles));
      return normalize(rawArticles);
    })
    .then(articles => {
      return getStories(articles);
    })
    // .then(stories => {

    //   Promise.all(stories)
    //     .then(stories => {
    //       let keywords = getKeywords([stories[0]]);
    //       console.log(keywords);
    //       let sentiments = getSentiment([stories[0]]);
    //       console.log(sentiments);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });

    // })
    .catch(err => {
      console.error(err);
    });
});


