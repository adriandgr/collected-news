const insert = require('./insert');

module.exports = entries => {
  entries.forEach(entry => {
    let n = 0;
    let keywords = entry.keywords.map(keyword => {
      return keyword;
    });
    Promise.all(insert.keywords(entry))
      .then(rows => {
        const keywordIds = rows.map(arr => {
          let [row, changed] = arr;
          if(changed){
            n++;
          }
          return row.id;
        });
        keywords.forEach((keyword, i) => {
          keyword.id = keywordIds[i];
        })
        return insert.article(entry)
          .then(row => {
            const articleId = row.id;
            return Promise.resolve(articleId);
          });
      })
      .then(articleId => {
        return Promise.all(insert.articleKeywords(keywords, articleId));
      })
      .then(rows => {
        const articleKeywordsIds = rows.map(row => { return row.id })
        n && console.log(`Added ${n} unique keywords`);
      })
      .catch(err => {
        console.error(err);
      });
  });
};






const entries = [{ sourceId: 1,
    title: 'Powerful cyclone slams into Australia\'s tropical northeast',
    link: 'http://feeds.foxnews.com/~r/foxnews/world/~3/oRFbVILHYY8/',
    pubDate: 'Tue, 28 Mar 2017 04:10:18 GMT',
    snippet: 'A powerful cyclone slammed into Australia\'s tropical northeast coast on Tuesday, tearing down fences, snapping trees and knocking out power to thousands, officials said.',
    source: 'www.foxnews.com',
    content: ' TOWNSVILLE, Australia –A powerful cyclone slammed into Australia\'s tropical northeast coast on Tuesday, tearing down fences, snapping trees and knocking out power to thousands, officials said. The destructive eyewall of Cyclone Debbie, a Category 4 storm packing winds up to 260 kilometers per hour (160 miles per hour), made landfall near Airlie Beach, a resort town in Queensland state, the Australian Bureau of Meteorology said in a statement. The town is a jumping-off point for the Whitsunday Islands, a popular tourist destination that has been pummeled by fierce winds that damaged roofs and knocked down palm trees. Officials warned that the slow-moving storm was likely to hover over the region for several hours before weakening as it moved inland. Queensland Police Commissioner Ian Stewart said the cyclone\'s glacial pace had created a  battering ram effect,  with some areas enduring the howling winds and drenching rains for a punishingly long time. Communities along more than 300 kilometers (200 miles) of coastline were expected to be impacted, he said.  I suspect before the day is out, we will see a lot of structural damage in the cyclone\'s path,  Stewart said. John Collins, a member of the Whitsundays government council, was sheltering from the storm with his wife and four daughters inside their house in Proserpine, a town south of Airlie Beach. He could see that four of his neighbors\' sheds had been destroyed and every house within eyesight — including his own — had lost their fences. At least four trees had been smashed to pieces.  It sounds like you got a jumbo jet sitting on the roof of your house,  Collins said by telephone of the wind roaring outside.  It really is so loud. It\'s incredible.  Collins\' wife and two of their daughters were so scared they were hiding under blankets. Meanwhile, one of his other daughters — whom he described as  a real weather nerd  — was enthralled with the storm, and was diligently listening to the radio for updates on its path. The family\'s power had been out since Tuesday morning, and they were resigned to several more hours of waiting until it was safe to emerge from their house.  It\'s just going on and on and on,  he said. Thousands of people evacuated low-lying areas in the storm\'s path on Monday. Hundreds of schools were closed on Tuesday and more than 20,000 households were without power by mid-afternoon.  Conditions have deteriorated rapidly,  Australian Prime Minister Malcolm Turnbull said in an address to Parliament.  Take care and stay safe. Be prepared to shelter in place until Wednesday.  Whitsundays Regional Council Mayor Andrew Willcox said authorities had received 98 requests for help and had responded to most of them. The storm also poses a serious threat to the farming region\'s crops. The area produces a wide range of fruits and vegetables, including tomatoes, mangoes and peppers. ',
    leadImgUrl: 'http://www.foxnews.com/content/dam/fox-news/logo/og-fn-foxnews.jpg',
    sentiment: -0.02631578947368421,
    keywords: [{ keyword: 'positivity', tf: 8 },
  { keyword: 'lovely', tf: 6 },
  { keyword: 'appreciation', tf: 4 },
  { keyword: 'grace', tf: 4 },
  { keyword: 'redemption', tf: 3 }] },
  { sourceId: 3,
    title: 'this is a test article',
    link: 'http://feeds.reuters.com',
    pubDate: 'Tue, 28 Mar 2017 04:10:18 GMT',
    snippet: 'teste snippet.',
    source: 'www.reuters.com',
    content: 'test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.test content. this is our final project. here we go, yup.',
    leadImgUrl: 'http://www.reuters.com/content/dam/reuters.jpg',
    sentiment: -0.02631578947368421,
    keywords: [{ keyword: 'test', tf: 8 },
  { keyword: 'content', tf: 6 },
  { keyword: 'final', tf: 4 },
  { keyword: 'project', tf: 4 }] }];


