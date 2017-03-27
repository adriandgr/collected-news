const rss = require('rss-parser');

module.exports = {

  parse: sources => {
    const feeds = [];
    sources.forEach(source => {
      feeds.push(
        new Promise((resolve, reject) => {
          rss.parseURL(source, (err, resulting) => {
            err ? reject( { description: err } ) : resolve(resulting.feed.entries)
          });
        })
      );
    });
    return feeds;
  },

  normalize: entries => {
    normalized = [];
    return new Promise((resolve, reject) => {
      entries.forEach((entry, i) => {
        if(entry.pubDate) {
          normalized.push(
            {
              id: i + 1,
              title: entry.title,
              link: entry.link,
              pubDate: entry.pubDate,
              snippet: entry.contentSnippet
            }
          );
          resolve(normalized);
        } else {
          reject( { description: 'Discarding entry w/out published date' } );
        }
      });
    });
  }

};