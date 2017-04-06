const Keyword = require('../models').Keyword;
const ArticleKeyword = require('../models').ArticleKeyword;
const keywords = require('./queries/keywords');
const sequelize = require('../models').sequelize;
const googleTrends = require('google-trends-api');
const moment = require('moment');
const fixed = require('./fixed-tren                            .json');
          `
                                                                                                                 `
module.exports = {
  index(req, res) {
    let page = req.query.p * 6 || 0
    keywords.list(data => {
      res.json(data.filter(each => {
        let pos = data.indexOf(each)
        return (pos >= page && pos < page + 6)
      }));
    });
  },
  all(req, res) {
    Keyword.all({
      attributes: [
      'id',
      'name',
      ]
    })
    .then(keywords => res.json(keywords))
    .catch(err => console.error(err))
  },
  individual(req, res) {
    let keyword = req.params.keyword
    keywords.individual(keyword, data => {
      res.json(data);
    })
  },
  top(req, res) {
    ArticleKeyword.all({
      attributes: [
      'keywordId',
      [ sequelize.fn('count', sequelize.col('keywordId')), 'rel' ]
      ],
      group: '"keywordId"',
      order: '"rel" DESC',
      limit: 10
    })
      .then(instances => {
        let keywords = [];
        let rel = [];
        instances.forEach(instance => {
          keywords.push(Keyword.findById(instance.dataValues.keywordId));
          rel.push(instance.dataValues.rel);
        });
        return Promise.all(keywords)
          .then(keywordInstances => {
            return Promise.resolve([keywordInstances, rel])
          });
      })
      .then(keywordInstancesAndRels => {
        const [keywordInstances, rels] = keywordInstancesAndRels;
        let keywordsAndRels = []
        keywordInstances.forEach((instance, i) => {
          keywordsAndRels.push(
            { keyword: instance.name, rel: rels[i] }
          );
        });
        res.json(keywordsAndRels);
      })
  },
  trends(req, res) {
    res.json(fixed)
    // ArticleKeyword.all({
    //   attributes: ['keywordId'],
    //   order: '"frequency" DESC',
    //   limit: 5
    // })
    //   .then(instances => {
    //     let keywords = [];
    //     instances.forEach(instance => {
    //       keywords.push(Keyword.findById(instance.dataValues.keywordId))
    //     });
    //     return Promise.all(keywords);
    //   })
    //   .then(instances => {
    //     let keywords = [];
    //     instances.forEach(instance => {
    //       keywords.push(instance.name);
    //     });
    //     let trends = [];
    //     keywords.forEach(keyword => {
    //       trends.push(googleTrends.interestOverTime({
    //         keyword: keyword,
    //         startTime: moment().subtract(1, 'year')._d
    //       }));
    //     });
    //     return Promise.all(trends)
    //       .then(trendData => {
    //         return [keywords, trendData]
    //       })
    //       .catch(err => {
    //         res.json({ success: 'false' });
    //         return null;
    //       });
    //   })
    //   .then(keywordsAndTrendData => {
    //     if(keywordsAndTrendData) {
    //       let [keywords, trendData] = keywordsAndTrendData;
    //       keywords = keywords.map((keyword, i) => {
    //         return {
    //           keyword: keyword,
    //           dataPoints: JSON.parse(trendData[i])
    //                           .default
    //                           .timelineData
    //                           .map(interval => { return interval.value[0] })
    //         }
    //       });
    //       res.json({ success: true, keywords: keywords });
    //     } else {
    //       console.error('Google Trends API failed: too many requests');
    //     }
    //   })
  }
};
