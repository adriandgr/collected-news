const news = require('./sources');
const mercury = require('./utils/mercury-test')(process.env.MERCURY_API_KEY);
const analyze = require('./utils/analysis');
const insert = require('./db');
const normalizeSentiments = require('./utils/normalize/sentiments');

const sourcesUrl = 'https://newsapi.org/v1/sources?language=en';

news.getSources(sourcesUrl)
  .then(sources => {
    console.log('Found', sources.length, 'sources');
    return news.insertSources(sources)
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
    return news.getArticles(sources)
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
          return insert(data)
        })
        .then(() => {
          normalizeSentiments();
        })
        .catch(err => {
          console.error(err);
        })
    });
  })
  .catch(err => {
    console.error(err);
  });