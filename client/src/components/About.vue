
<template>
  <div class="ui text container">

    <div class="ui raised segment article-content">


      <h1>About Collected News</h1>

      <p>
        CN is a news aggregation service indexing worldwide news via the <a href="https://newsapi.org/">News API</a> on an hourly basis. The app will display the most popular news topics on the homepage as well as giving users several search parameters. Each article and source will have a sentiment attached (eg. negative/neutral/positive); each keyword can be clicked through to view individual articles alongside their assigned media outlet and sentiment value. The app will provide an assortment of analytic data. </p>

      <h1>The Tech Stack</h1>
      <p>This is a collaborative final project for the immersive code bootcamp by Lighthouse Labs, Vancouver. As such, we couldn't leave you hanging and not tell you a little more about the technologies we used to power this web app.</p>

      <div class="ui list">
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a href= "https://www.postgresql.org/" class="header">Postgres</a>
            <div class="description">For our persistence layer. We had already worked with this SQL database during bootcamp and since we had relational data this was a no-brainer.</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a href="http://docs.sequelizejs.com/en/v3/" class="header">Sequelize</a>
            <div class="description">To handle CRUD operations with promises. This ORM was not covered as part of the bootcamp curriculum, so it exposed us to a new way of managing our database.</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a href="https://nodejs.org/en/" class="header">Node.js</a>
            <div class="description">To handle all application business logic using both ES5 (client) and ES6 (server) syntax</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a href="https://expressjs.com/" class="header">Express</a>
            <div class="description">To manage our server routes, deliver content, and power the API. Unlike previous projects, there is very little server rendered HTML, allowing us to learn new ways to structure our application logic.</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a href="https://vuejs.org/" class="header">Vue.js</a>
            <div class="description">We used this progressive, component based framework for our client-side application. This was not covered during the bootcamp, and therefore it was one of the most challenging component to learn and effectively provision over the course of 10 days.</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a class="header">Semantic UI</a>
            <div class="description">For out CSS framework. Once again we opted for a new solution not covered in the bootcamp. The actual usage of the framework was straigtforward, however the selection process was more interesting as we tried to make the best choice that would have the least amount of friction with Vue.</div>
          </div>
        </div>
        <div class="item">
          <i class="chevron right icon"></i>
          <div class="content">
            <a class="header">digitalocean</a>
            <div class="description">As a proudly Canadian app, we deployed to the Toronto datacenter. This was also a new service we hadn't encoutered during the bootcamp. Unlike Heroku it gave us a lot more freedom to configure the VPN. There were several challenges during this stage, particularly being able to set our environment variables correctly through pm2. Another surpise along the way was finding out that the basic droplet size was not sufficient to power all processing hungry operations used for scraping and analyzing the articles. </div>
          </div>
        </div>
      </div>




      </p>

    </div>

  </div>
</template>

<style scoped>

.article-content {
  padding: 50px !important;

}
.article-content p {

  font-size: 1.1em;
}
.leadArticleImg {
  margin: 10px 20px 40px 0;
  width: 100%;
  float: left;
}

h1, h2 {
  font-weight: normal;
  font-family: 'Playfair Display', serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
