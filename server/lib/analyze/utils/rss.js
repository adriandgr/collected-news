const rss = require('rss-parser');

module.exports = {
  parse: sources => {
    const feeds = [];
    sources.forEach(source => {
      feeds.push(
        new Promise((resolve, reject) => {
          rss.parseURL(source.link, (err, resulting) => {
            err ? reject( { description: err } ) : resolve( [{ sourceId: source.id, entries: resulting.feed.entries }] );
          });
        })
      );
    });
    return feeds;
  },
  normalize: data => {
    const normalized = [];
    return new Promise((resolve, reject) => {
      data.forEach(set => {
        set.entries.forEach(entry => {
          if (entry.pubDate) {
            normalized.push(
              {
                sourceId: set.sourceId,
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
    });
  }
};