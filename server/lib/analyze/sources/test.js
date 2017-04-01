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
    insertSources(sources)
      .catch(err => {
        console.log(err);
      })
    return getArticles(sources);
  })
  .then(articles => {
    articles.forEach(articlesFromOneSource => {
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

          articleBodiesFromMercury.forEach((body, i) => {
            articlesFromOneSource[i].source = body.source;
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










// class News {
//   constructor(apiKey) {
//     this.sourcesUrl = 'https://newsapi.org/v1/sources?language=en';
//     this.rawSources;
//     this.sources = [];
//     this.articlesBaseURL = 'https://newsapi.org/v1/articles?source=';
//     this.rawArticles = [];
//     this.articles = [];
//     this.apiKey = apiKey;
//   }

  // insertSources() {
  //   const container = [];
  //   this.rawSources.forEach(source => {
  //     container.push(Promise.resolve(
  //       Source.findOrCreate({
  //         where: {
  //           name: source.name,
  //           link: source.url,
  //           description: source.description
  //         }
  //       })
  //     ));
  //   });
  //   return container;
  // }

//   getSources() {
//     return new Promise(resolve => {
//       request(this.sourcesUrl, (e, r, body) => {
//         const incoming = JSON.parse(body);
//         this.rawSources = incoming.sources;
//         if(incoming.status === 'ok') {
//           this.rawSources = incoming.sources;
//           Promise.all(this.insertSources())
//             .then(sources => {
//               sources.forEach(source => {
//                 [source, ] = source;
//                 this.sources.push(source.dataValues);
//               });
//               resolve(this.sources);
//             })
//             .catch(err => {
//               console.error(err);
//             });
//         } else {
//           console.error(e);
//         }
//       });
//     });
//   }

//   getArticles() {
//     this.rawSources.forEach(source => {
//       let url = this.articlesBaseURL + source.id + '&apiKey=' + this.apiKey;
//       this.rawArticles.push(new Promise(resolve => {
//         request(url, (e, r, body) => {
//           resolve(JSON.parse(body));
//         });
//       }));
//     });
//     return this.rawArticles;
//   }

//   // normalizeData() {
//   //   return new Promise(resolve => {
//   //     this.rawArticles.forEach(article => {
//   //       this.articles.push(
//   //         {
//   //           sourceId:
//   //           title: entry.title,
//   //           link: entry.link,
//   //           pubDate: entry.pubDate,
//   //           snippet: entry.contentSnippet
//   //         }
//   //       )
//   //     })
//   //   })
//   // }

// // }









// const news = new News('c95c62923b284f78ba43b39eb335c35b');

// news.getSources()
//   .then(sources => {
//     return news.getArticles();
//   })
//   .then(articlePromises => {
//     Promise.all(articlePromises)
//       .then(articleData => {
//         articleData.forEach(response => {
//           mercury.resolve(response.articles)
//             .then(mercuryData => {

//               // Remove bad data
//               let i = mercuryData.length;
//               while(i--) {
//                 if(!mercuryData[i].success) {
//                   mercuryData.splice(i, 1);
//                   news.sources.splice(i, 1);
//                 }
//               }



              // // Add to entries object
              // mercuryData.forEach((article, i) => {
              //   entries[i].content = JSON.stringify(article.content.paragraphs);
              //   entries[i].leadImgUrl = article.leadImgUrl;
              // });



  //             console.log();
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // })
  // .catch(err => {
  //   console.error(err);
  // })
  // .then(data => {
  //   console.log(data);
  // })

// function insert(sources) {
//   const container = [];
//   sources.forEach(source => {
//     container.push(Promise.resolve(
//       Source.findOrCreate({
//         where: {
//           name: source.name,
//           link: source.url,
//           description: source.description
//         }
//       })
//     ));
//   });
//   return container;
// }

// function populateSources() {
//   url = 'https://newsapi.org/v1/sources?language=en';
//   return new Promise(resolve => {
//     request(url, (e, r, body) => {
//       const incoming = JSON.parse(body);
//       if(incoming.status === 'ok') {
//         const sources = incoming.sources;
//         Promise.all(insert(sources))
//           .then(sources => {
//             const container = [];
//             sources.forEach(source => {
//               container.push(source[0].dataValues);
//             });
//             resolve(container);
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       } else {
//         console.error(e);
//       }
//     });
//   });
// }

// function populateArticles(sources) {

// }

// module.exports = {
//   populateSources: populateSources;
//   populateArticles: populateArticles;
// }
