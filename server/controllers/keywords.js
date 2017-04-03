const Keyword = require('../models').Keyword;
const ArticleKeyword = require('../models').ArticleKeyword;
const keywords = require('./queries/keywords');
const sequelize = require('../models').sequelize;
const googleTrends = require('google-trends-api');
const moment = require('moment');

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
  trends(req, res) {
    ArticleKeyword.all({
      attributes: ['keywordId'],
      order: '"frequency" DESC',
      limit: 5
    })
      .then(instances => {
        let keywords = [];
        instances.forEach(instance => {
          keywords.push(Keyword.findById(instance.dataValues.keywordId))
        });
        return Promise.all(keywords);
      })
      .then(instances => {
        let keywords = [];
        instances.forEach(instance => {
          keywords.push(instance.name);
        });
        let trends = [];
        keywords.forEach(keyword => {
          trends.push(googleTrends.interestOverTime({
            keyword: keyword,
            startTime: moment().subtract(5, 'days')._d
          }));
        });
        return Promise.all(trends)
          .then(trendData => {
            return [keywords, trendData]
          })
      })
      .then(keywordsAndTrendData => {
        let [keywords, trendData] = keywordsAndTrendData;
        let incoming;
        keywords = keywords.map((keyword, i) => {
          return {
            keywords: keyword,
            dataPoints: JSON.parse(trendData[i])
                            .default
                            .timelineData
                            .map(interval => {
                              return interval.value[0]
                            })
          }
        });
        res.json(keywords);
      })
  }
};
