const normalize = require('./normalize');

normalize(-0.0601092896174863)
  .then(n => {
    console.log(n);
  })