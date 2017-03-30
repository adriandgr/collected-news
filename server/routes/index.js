const articleKeywordsController = require('../controllers').articleKeywords;
const articlesController = require('../controllers').articles;
const keywordsController = require('../controllers').keywords;
const keywordSourcesController = require('../controllers').keywordSources;
const sourcesController = require('../controllers').sources;

const fakeData = { articles: [
  {
    id: 4,
    title: 'Jared Kushner to testify in Russian probe after connection with Russian bank surfaces',
    link: 'http://globalnews.ca/news/3338133/trump-jared-kushner-russian-probe-bank/',
    pubDate: 'Mon, 27 Mar 2017 22:21:01 +0000',
    snippet: 'Kushner, married to Trump\'s daughter Ivanka Trump, has agreed to testify to a Senate committee investigating whether Russia tried to interfere in the election.',
    source: 'globalnews.ca',
    content: ' A Russian bank under U.S. economic sanctions over Russia’s incursion into Ukraine disclosed on Monday that its executives had met Jared Kushner, President Donald Trump’s son-in-law and a top White House adviser, during the 2016 election campaign.Kushner, 36, married to Trump’s daughter Ivanka Trump, has agreed to testify to a Senate committee investigating whether Russia tried to interfere in the election. Allegations by U.S. intelligence agencies that Russian actors were behind hacking of senior Democratic Party operatives and spreading disinformation linger over Trump’s young presidency. Democrats charge the Russians wanted to tilt the election toward the Republican, a claim dismissed by Trump. Russia denies the allegations.READ MORE: Ivanka Trump and Jared Kushner are frustrating their neighbours: ‘It’s been a three-ring circus’But there has been no doubt that the Russian ambassador to the United States, Sergei Kislyak, developed contacts among the Trump team. Trump’s first national security adviser, Michael Flynn, was forced to resign on Feb. 13 after revelations that he had discussed U.S. sanctions on Russia with Kislyak and misled Vice President Mike Pence about the conversations.Executives of Russian state development bank Vnesheconombank (VEB) had talks with Kushner during a bank roadshow in 2016 when it was preparing a new strategy, the bank said.WATCH: White House declines to comment on Kushner appointment, points to own ethical standards“As part of the preparation of the new strategy, executives of Vnesheconombank met with representatives of leading financial institutes in Europe, Asia and America multiple times during 2016,” VEB said in an emailed statement.It said roadshow meetings took place “with a number of representatives of the largest banks and business establishments of the United States, including Jared Kushner, the head of Kushner Companies.”There was no immediate comment from Kushner.READ MORE: Trump’s son-in-law Jared Kushner met with Russian ambassador before inaugurationIn an article posted on Dec. 18, Forbes estimated that Jared Kushner, his brother Josh and his parents, Charles and Seryl, have a fortune worth at least $1.8 billion, more than half of which Forbes estimates is held in real estate.Forbes did not provide a specific estimate for Jared Kushner’s net worth on his own.VEB declined to say where the meetings took place or the dates. U.S. officials said that after meeting with Russian Kislyak at Trump Tower last December, a meeting also attended by Flynn, Kushner met later in December with Sergei Gorkov, the CEO of Vnesheconombank. White House spokeswoman Hope Hicks confirmed the meetings.On Monday, White House spokesman Sean Spicer told reporters that Kushner is willing to testify to the Senate Intelligence Committee chaired by U.S. Senator Richard Burr, a North Carolina Republican.“Throughout the campaign and the transition, Jared served as the official primary point of contact with foreign governments and officials … and so, given this role, he volunteered to speak with Chairman Burr’s committee, but has not received any confirmation regarding a time for a meeting,” Spicer told reporters at his daily briefing.The Republican and Democratic leaders of the Senate panel also said Kushner had agreed to be interviewed.Simply meeting with representatives of a U.S.-sanctioned entity is not a violation of sanctions or against the law.Evgeny Buryakov, 41, a Russian citizen who worked at Vnesheconombank and whom U.S. authorities accused of posing as a banker while participating in a New York spy ring, pleaded guilty to a criminal conspiracy charge on Friday. Buryakov admitted in federal court in Manhattan to acting as an agent for the Russian government without notifying U.S. authorities.WATCH: White House denies ‘transparency problem’ around Devin NunesClassified informationAlso on Monday, a mystery rooted in Trump’s claim that he was wiretapped by then President Barack Obama during the election campaign deepened with the disclosure that a top congressional Republican reviewed classified information on the White House grounds about potential surveillance of some Trump campaign associates.U.S. Representative Devin Nunes, chairman of the House of Representatives Intelligence Committee, visited the White House the night before announcing on Wednesday that he had information that indicated some Trump associates may have been subjected to some level of intelligence activity before Trump took office on Jan. 20.Democrats have said Nunes, who was a member of Trump’s transition team, can no longer run a credible investigation of Russian hacking, the U.S. election and any potential involvement by Trump associates. Top House Democrat Nancy Pelosi last week called Nunes “a willing stooge of Trump.”Nunes spokesman Jack Langer said in a statement that Nunes “met with his source at the White House grounds in order to have proximity to a secure location where he could view the information provided by the source.”READ MORE: Devin Nunes apologizes over handling Donald Trump surveillance claimWhite House spokesman Spicer did not shed any light on who at the White House helped Nunes gain access to a secure location.It was the latest twist in a saga that began on March 4 when Trump said on Twitter without providing evidence that he “just found out that Obama had my ‘wires tapped’ in Trump Tower just before the victory.”FBI Director James Comey told Congress last Monday he had seen no evidence to support the claim.Trump’s mention of wiretapping drew attention away from U.S. intelligence agencies having said that Russia tried to help Trump in the election against Democrat Hillary Clinton.Nunes told reporters on Wednesday that he had briefed Trump “on the concerns I had about incidental collection and how it relates to President-elect Trump and his transition team and the concerns that I have.”After an uproar over the allegations and the fact that he briefed Trump first before members of his own committee, Nunes apologized on Thursday for the way he handled the information.',
    leadImgUrl: 'https://shawglobalnews.files.wordpress.com/2017/03/caima501-124_2017_135724_high.jpg?quality=70&strip=all&w=650&h=480&crop=1',
    sentiment: -0.08620689655172414,
    keywords: [
      { keyword: 'video', tf: 8 },
      { keyword: 'racist', tf: 6 },
      { keyword: 'people', tf: 4 },
      { keyword: 'public', tf: 4 },
      { keyword: 'chinese fire drill', tf: 3 }],
  }, {
    id: 8,
    title: 'Family has questions about Regina woman’s laundry chute death as inquest begins',
    link: 'http://globalnews.ca/news/3338143/family-has-questions-about-regina-womans-laundry-chute-death-as-inquest-begins/',
    pubDate: 'Mon, 27 Mar 2017 22:07:43 +0000',
    snippet: 'The family of a Regina woman found dead at the bottom of a hotel laundry chute is questioning how she fit through the chute door.',
    source: 'globalnews.ca',
    content: ' The family of a Regina woman found dead at the bottom of a hotel laundry chute is questioning how she fit through the chute door.An inquest into the death of Nadine Machiskinic started Monday with police photos and testimony describing the chute opening as 53 centimetres wide.READ MORE: Inquest into death of woman who fell down Regina hotel laundry chute scheduled for March Machiskinic was found at the bottom of the chute in January 2015.An autopsy found she died of blunt force trauma after falling 10 storeys and the death was ruled accidental, with the coroner noting that the mother of four had drugs in her system.Machiskinic’s aunt, Delores Stevenson, wants to know how her niece fell through such a small opening.Stevenson says she hopes the inquest will give her family the answers they need.“The dimensions of the laundry chute – I’m not an expert but that looked like a pretty small laundry chute to start with. I’m just wondering how somebody could fit in that small, little laundry chute, manoeuvre their way … how does somebody get into that little small space?” she said outside the inquest Monday.“I hope that we’ll get some truth, I hope that we’ll get some answers.”Machiskinic’s family has raised concerns that police were not taking her death seriously.Const. Keith Malcolm told the inquest that police made an error when they delayed sending toxicology samples for testing for several months. Malcolm thought another officer in the forensics unit had sent the samples for testing and the other officer thought Malcolm had done it.“Nobody’s proud of their mistakes and this is why toxicology wasn’t sent. It was human error,” he said.Malcolm says police have since changed procedures to avoid such mistakes in the future.The inquest is scheduled to last all week.© 2017 The Canadian Press ',
    leadImgUrl: 'https://shawglobalnews.files.wordpress.com/2016/01/nadine-machiskinic00000000.jpg?quality=70&strip=all&w=720&h=480&crop=1',
    sentiment: -0.6020066889632107,
    keywords: [
      { keyword: 'trump', tf: 26 },
      { keyword: 'health care', tf: 11 },
      { keyword: 'president', tf: 10 },
      { keyword: 'white house', tf: 9 },
      { keyword: 'law', tf: 8 },
    ]}, {
      keywords: [
        { keyword: 'Tump Trudeau', tf: 15 },
      ],
      sentiment: 0.48620689655172414,
      leadImgUrl: 'https://i.cbc.ca/1.3979788.1486992268!/cpImage/httpImage/image.jpg_gen/derivatives/4x3_620/trudeau-trump-20170213-topix.jpg',
      title: 'Trump and Trudeau meeting hits right notes for Canadians wary of trade threat',
      link: 'https://www.thestar.com/news/world/2017/02/13/five-revealing-moments-from-the-trudeau-trump-day.html'
  }]};


module.exports = (app) => {
  app.use((req, res, next) => {
    // TODO: REMOVE THIS CORS RULE IN PRODUCTION!!! this is not secure
    res.header('Access-Control-Allow-Origin', '*')
    Promise.resolve(next()).catch((ex) => {
      // handle error
      res.status(400);
      res.send(ex.message);
    });
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  // Sources
  app.get('/api/sources', sourcesController.index);
  app.get('/api/sources/:id', sourcesController.individual);

  // Keywords
  app.get('/api/keywords', keywordsController.index);
  app.get('/api/keywords/all', keywordsController.all);
  app.get('/api/keywords/:keyword', keywordsController.individual);

  // Articles
  app.get('/api/articles', articlesController.index);
  app.get('/api/keywords/all', keywordsController.all);
  app.get('/api/articles/:id', articlesController.individual);

  app.post('/api/sources/:sourceId/articles/:articleId/', articleKeywordsController.create);
  app.post('/api/sources', keywordSourcesController.create);

  app.get('/api/faking', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
    res.status(200).send(fakeData);
  });
  
  app.all('/api', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
