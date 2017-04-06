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
      attributes: ['keywordId', 'frequency'],
      order: '"frequency" DESC',
      limit: 10
    })
      .then(instances => {
        let keywords = [];
        let frequencies = [];
        instances.forEach(instance => {
          keywords.push(Keyword.findById(instance.dataValues.keywordId));
          frequencies.push(instance.dataValues.frequency);
        });
        return Promise.all(keywords)
          .then(keywordInstances => {
            return Promise.resolve([keywordInstances, frequencies])
          });
      })
      .then(keywordInstancesAndFrequencies => {
        const [keywordInstances, frequencies] = keywordInstancesAndFrequencies;
        let keywordsAndFrequencies = []
        keywordInstances.forEach((instance, i) => {
          keywordsAndFrequencies.push(
            { keyword: instance.name, frequency: frequencies[i] }
          );
        });
        res.json(keywordsAndFrequencies);
      })
  },
  allStats(req, res) {
    let keyword = req.params.keyword
    keywords.individual(keyword, data => {
      res.json(data);
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
