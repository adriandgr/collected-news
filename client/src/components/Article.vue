<template>
  <div class="ui text container">
  <p><em>keword:</em> {{ thisArticle.keyword }}</p>
  <div v-if="thisArticle" class="ui raised segment article-content">

<h4 class="ui header">With metadata</h4>
<p>A progress bar can be initialized with metadata</p>
<div class="ui teal progress" data-percent="74" id="example1">
  <div class="bar"></div>
  <div class="label">74% Funded</div>
</div>


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
    articleIds () {
      let ids = []
      this.$store.getters.articles.results.forEach(a => {
        ids.push(a.id)
      })
      return ids
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
  },
  mounted: function () {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      $('#example1').progress();
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
