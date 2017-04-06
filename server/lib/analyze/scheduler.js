const cron    = require('node-cron');
const scrape  = require('./index');
const URL     = 'https://newsapi.org/v1/sources?language=en';

cron.schedule('0 * * * *', () => {
  console.log('=======================');
  console.log('=  Beginnging scrape  =');
  console.log('=======================');
  scrape(URL);
});