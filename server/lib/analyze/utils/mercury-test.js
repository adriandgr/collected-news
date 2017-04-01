const request = require('request');
const sanitize = require('sanitize-html');

class Mercury {
  constructor(apiKey) {
    this.baseURL = 'https://mercury.postlight.com/parser?url=';
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    };
    this.options = {
      url: this.baseURL,
      headers: this.headers,
    };
  }
}

Mercury.prototype.clean = function(content) {
  let body = sanitize(content, { allowedTags: ['p'], allowedAttributes: [] } )
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, '')
    .replace(/&.{4};/g, ' ');
  const paras = [];
  body.split('<p>').join('').split('</p>')
    .forEach(p => {
      chars = /[a-zA-Z]+/g.test(p);
      chars && paras.push(p);
    });
  body = sanitize(body, { allowedTags: []});
  return { body: body, paragraphs: paras };
};

Mercury.prototype.resolve = function(data) {
  this.articles = [];
  data.forEach(entry => {
    this.options.url += entry.url;
    this.articles.push(this.fetch(entry.articles));
    this.options.url = this.baseURL;
  });
  return Promise.all(this.articles);
};

Mercury.prototype.fetch = function(entry) {
  return new Promise((resolve, reject) => {
    request(this.options, (err, response, body) => {
      if(body) {
        const incoming = JSON.parse(body) || 0;
        if (!incoming || !incoming.word_count || incoming.word_count < 250) {
          resolve({
            success: false,
            wordCount: incoming.word_count
          });
        } else {
          let content = this.clean(incoming.content);
          resolve({
            success: true,
            source: incoming.domain,
            leadImgUrl: incoming.lead_image_url,
            content: content,
            wordCount: incoming.word_count
          });
        }
      } else {
        console.log('rejecting in mercury');
        reject({ description: 'Mercury failed', data: { trace: err, entry: entry } });
      }
      // TODO
      // Make this less hacky; there has got to be a better way
    });
  });
};

module.exports = apiKey => {
  return new Mercury(apiKey);
}