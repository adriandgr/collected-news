<template>
  <div class="ui text container">

  <div v-if="article" class="ui raised segment article-content">

    <SentimentBar :sentiment="sentiment"></SentimentBar>
    <h1>{{ article.title }}</h1>

    <p>
      <a :href="article.link" target="_blank">
        <i class="external icon" title="read original"></i>
      </a>
      <em>{{article.author || source }}</em> | {{pubDate}}
    </p>
    <img :src="article.leadImageUrl" class="leadArticleImg">
    <br><br>

    <p>{{ firstParagraph }}</p>

    <p v-for="p in restOfContent" > {{p}}</p>
</div>


  </div>
</template>

<script>
import SentimentBar from '@/components/partials/SentimentBar'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'article',
  components: {
    SentimentBar
  },
  computed: {
    ...mapGetters([
      'articleById',
      'sourceById',
      'articleSentiment'
    ]),
    pubDate() {
      return moment(this.article.pubDate).format('lll')
    },
    source() {
      return this.sourceById(Number(this.article.sourceId))
    },
    article() {
      let article = this.articleById(this.$route.params.id)
      if (!article) {
        this.findArticle()
          .then((item) => {
            return item
          })
          .catch(err => console.log(err))
      }
      return article
    },
    sentiment () {
      return this.articleSentiment(this.$route.params.id)
    },
    articleContent () {
      return JSON.parse(this.article.content)
    },
    firstParagraph () {
      return this.articleContent[0]
    },
    restOfContent() {
      return this.articleContent.splice(1)
    }
  },
  methods: {
    ...mapActions([
      'addArticleById'
    ]),
    findArticle () {
      return new Promise((resolve, reject) => {
        let article = this.articleById(this.$route.params.id)
        if (!article) {
          console.log('no article found', article)
        this.addArticleById(this.$route.params.id)
          .then((res) => {
            resolve(this.articleById(this.$route.params.id))
          })
        }
      })

    }
  },
  created () {
    this.findArticle().then((res) => {
      console.log('promised', res)
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
