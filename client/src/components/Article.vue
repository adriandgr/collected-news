<template>
  <div class="ui text container">
<!--   <p><em>keword:</em> {{ thisArticle.keyword }}</p> -->
  <div v-if="thisArticle" class="ui raised segment article-content">

  <table>
    <tr>
      <td>
        <div :class="articleSentiment < 0 ? 'ui red tiny progress flipped' : 'ui disabled tiny progress flipped'" :data-percent="articleSentiment < 0 ? Math.abs(articleSentiment)-1 : 99" id="example1">
          <div class="bar" v-progress></div>
        </div>
      </td>

      <td>
        <div :class="articleSentiment >= 0 ? 'ui green tiny progress' : 'ui disabled tiny progress'" :data-percent="articleSentiment >= 0 ? articleSentiment : 99" id="example2">
          <div class="bar"v-progress></div>
        </div>
      </td>
    </tr>
  </table>
<div class="sentiment-score">sentiment score: {{articleSentiment}}</div>

    <h1>{{ thisArticle.title }}</h1>

    <p>
      <img :src="thisArticle.leadImageUrl" class="leadArticleImg">
      {{ thisArticle.content }}
    </p>
</div>


  </div>
</template>

<script>

export default {
  name: 'article',
  data () {
    return {
      msg: 'Article View',
      articleId: this.$route.params.id
    }
  },
  computed: {
    articles () {
      return this.$store.getters.articles.results
    },
    articleSentiment () {
      let article = this.thisArticle
      console.log('art!',article)
      if (!article) {
        return
      }
      return (Math.ceil(article.sentiment*1000) > 100 || Math.ceil(article.sentiment*1000) < -100 ? 100 * (Math.ceil(article.sentiment/Math.abs(article.sentiment))) : Math.ceil(article.sentiment*1000))
    },
    thisArticle () {
      const article = this.$store.getters.articles.results.find(a => {
        return a.id === Number(this.$route.params.id)
      })
      if (!article) {
        return
      }
      return {
        title: article.title,
        author: article.author,
        pubDate: article.pubDate,
        content: article.content,
        leadImageUrl: article.leadImageUrl,
        link: article.link,
        sentiment: article.sentiment,
        snippet: article.snippet,
        keyword: article.name
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.sentiment-score {
  float: right;
  transform: translate(-5px, -15px);
}

table {
    width: 100%;
}
.flipped {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}



.article-content {
  padding: 50px !important;

}
.article-content p {

  font-size: 1.1em;
}
.leadArticleImg {
  margin-right: 20px;
  margin-bottom: 20px;
  width: 400px;
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
