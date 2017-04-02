// const dotenv = require('dotenv').config();
const request = require('request');
const { Source } = require('../../../models');

module.exports = {
  insertSources: sources => {
    const inserts = [];
    sources.forEach(source => {
      inserts.push(Promise.resolve(
        Source.findOrCreate({
          where: {
            name: source.name,
            link: source.url,
            description: source.description,
            logoLink: source.urlsToLogos.small,
            category: source.category,
            language: source.language,
            country: source.country,
          },
        })
      ));
    });
    return Promise.all(inserts);
  },
  getSources: url =>
    new Promise((resolve, reject) => {
      request(url, (e, r, body) => {
        if (body) {
          const incoming = JSON.parse(body);
          if (incoming.status === 'ok') {
            const sources = incoming.sources;
            resolve(sources);
          } else {
            reject({ error: `Incoming status - ${incoming.status}` });
          }
        } else {
          reject('Response contained no body while fetching sources');
        }
      });
    }),
  getArticles: sources => {
    const articles = [];
    let url = 'https://newsapi.org/v1/articles?source=';
    sources.forEach(source => {
      url += `${source.id}&apiKey=${process.env.NEWSAPI_KEY}`;
      articles.push(new Promise((resolve, reject) => {
        request(url, (e, r, body) => {
          if (body) {
            const incoming = JSON.parse(body);
            if (incoming.status === 'ok') {
              articles.push(resolve(incoming.articles));
            } else {
              reject(incoming.status);
            }
          } else {
            reject('Response contained no body while fetching sources');
          }
        });
      }));
      url = 'https://newsapi.org/v1/articles?source=';
    });
    return Promise.all(articles);
  },
};
