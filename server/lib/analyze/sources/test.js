const request = require('request');
const {Source} = require('../../../models');
const mercury = require('../utils/mercury-test')(process.env.MERCURY_API_KEY);
const analyze = require('../utils/analysis');
const insert = require('../db');

function insertSources(sources) {
  const inserts = [];
  sources.forEach(source => {
    inserts.push(Promise.resolve(
      Source.findOrCreate({
        where: {
          name: source.name,
          link: source.url,
          description: source.description
        }
      })
    ));
  });
  return Promise.all(inserts);
}

function getSources(url) {
  return new Promise((resolve, reject) => {
    request(url, (e, r, body) => {
      if(body) {
        const incoming = JSON.parse(body);
        if(incoming.status === 'ok') {
          const sources = incoming.sources;
          resolve(sources);
        } else {
          reject({ error: `Incoming status - ${incoming.status}` });
        }

      } else {
        reject('Response contained no body while fetching sources')
      }
    });
  });
}

function getArticles(sources) {
  const articles = [];
  let url = 'https://newsapi.org/v1/articles?source='
  sources.forEach(source => {
    url += source.id + '&apiKey=c95c62923b284f78ba43b39eb335c35b';
    articles.push(new Promise((resolve, reject) => {
      request(url, (e, r, body) => {
        if(body) {
          const incoming = JSON.parse(body);
          if(incoming.status === 'ok') {
            articles.push(resolve(incoming.articles));
          } else {
            reject(incoming.status);
          }
        } else {
          reject('Response contained no body while fetching sources')
        }
      });
    }));
    url = 'https://newsapi.org/v1/articles?source='
  });
  return Promise.all(articles);
}

url = 'https://newsapi.org/v1/sources?language=en';

getSources(url)
  .then(sources => {
    console.log('Found', sources.length, 'sources');
    return insertSources(sources)
      .then(insertions => {
        const sourceIds = [];
        insertions.forEach(insertion => {
          [instance, ] = insertion;
          sourceIds.push(instance.id);
        });
        return Promise.resolve([sources, sourceIds]);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .then(sourcesAndSourceIds => {
    [sources, sourceIds] = sourcesAndSourceIds;
    return getArticles(sources)
      .then(articles => {
        return [articles, sourceIds];
      });
  })
  .then(articlesAndSourceIds => {
    [articles, sourceIds] = articlesAndSourceIds;
    articles.forEach((articlesFromOneSource, index) => {
      console.log('Found', articlesFromOneSource.length, 'articles from a source');
       mercury.resolve(articlesFromOneSource)
        .then(articleBodiesFromMercury => {

          let i = articleBodiesFromMercury.length;
          while(i--) {
            if(articleBodiesFromMercury[i].success === false) {
              articleBodiesFromMercury.splice(i, 1);
              articlesFromOneSource.splice(i, 1);
            }
          }

          const thisSourceId = sourceIds[index];

          articleBodiesFromMercury.forEach((body, i) => {
            articlesFromOneSource[i].sourceId = thisSourceId;
            articlesFromOneSource[i].content = JSON.stringify(body.content.paragraphs);
            articlesFromOneSource[i].leadImgUrl = body.leadImgUrl;
            articlesFromOneSource[i].sentiment = analyze.sentiment(body);
            articlesFromOneSource[i].keywords = analyze.keywords(body);
          });

          return Promise.resolve(articlesFromOneSource)
        })
        .then(data => {
          return Promise.resolve(insert(data))
        })
        .catch(err => {
          console.error(err);
        })
    });
  })
  .catch(err => {
    console.error(err);
  });