const cron = require('node-cron');

let n = 0;

cron.schedule('0 * * * * *', () => {
  n++;
  console.log(`It's been ${n} minutes`);
});