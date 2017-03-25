const rss = require('rss-parser');
const request = require('request');
const sanitizeHTML = require('sanitize-html');
g = require('gramophone');
s = require('sentiment');

const MERCURY_API_KEY = 'VMBlkUzDGndnxyTLplKHzyNMdBg3pIWyMbuHkB19';

let results = [];

// Step 1 - parse RSS feeds and resolve an array of articles from each source
function getFeeds() {
  const feeds = [];
  sources.forEach((source) => {
    feeds.push(new Promise(resolve => {
      rss.parseURL(source, (err, parsed) => {
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
      console.error('Discarding article w/out published date');
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
      'x-api-key': MERCURY_API_KEY
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
        const leadImgUrl = body.lead_image_url;
        resolve( { leadImgUrl: leadImgUrl, content: story } );
      });
    }));
    options.url = URL;
  });

  return stories;
}

function getKeywords(bodies) {
  let keywords = [];
  bodies.forEach(body => {
    keywords.push(g.extract(body, { score: true, limit: 5 }));
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

function populateInitial(articles) {
  results = articles;
}

function populate(data) {
  Object.keys(data).forEach((key) => {
    data[key].forEach((value, i) => {
      results[i][key] = value;
    });
  });
}


getFeeds(sources).forEach(feed => {

  feed
    .then(rawArticles => {
      return normalize(rawArticles);
    })
    .then(articles => {
      populateInitial(articles);
      return getStories(articles);
    })
    .then(bodies => {
      Promise.all(bodies)
        .then(bodies => {

          let content = [];
          let leadImgUrl = [];

          bodies.forEach(body => {
            content.push(body.content);
            leadImgUrl.push(body.leadImgUrl);
          });

          let data = {
            content: content,
            leadImgUrl: leadImgUrl,
            keywords: getKeywords(content),
            sentiment: getSentiment(content)
          };

          populate(data);

          console.log(results[0]);
          console.log(results[5]);
          console.log(results[10]);

        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
});


