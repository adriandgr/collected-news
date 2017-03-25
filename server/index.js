const express = require('express');
const app = express();
const port = 3000;

const analyze = require('lib/analyze');

app.get('/', (res, req) => {
  res.send('Found /');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});