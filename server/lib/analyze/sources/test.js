const request = require('request');
const {Source} = require('../../../models');

function insert(sources) {
  const container = [];
  sources.forEach(source => {
    container.push(Promise.resolve(
      Source.findOrCreate({
        where: {
          name: source.name,
          link: source.url,
          description: source.description
        }
      })
    ));
  });
  return container;
}

function getSources(url) {
  request(url, (e, r, body) => {
    const incoming = JSON.parse(body);
    if(incoming.status === 'ok') {
      const sources = incoming.sources;
      Promise.all(insert(sources))
        .then(rows => {
          rows.forEach(row => {
            console.log(row[0].id);
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.error(e);
    }
  });
}

getSources('https://newsapi.org/v1/sources?language=en');