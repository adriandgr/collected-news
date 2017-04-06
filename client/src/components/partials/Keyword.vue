<template>
    <div :class="(article.sentiment > -0.01 && article.sentiment < 0.01 ) ? 'ui grey centered card' : (article.sentiment > 0 ? 'ui green centered card' : 'ui red centered card')" v-if="isMod()">
      <router-link :to="`/article/${article.id}`" class="image">
        <img src="../../assets/transparent.png" class="centered-and-cropped" :style="`background-image: url('${article.leadImageUrl}');`">
      </router-link>
      <div class="content">
      <div class="meta">
          &mdash; keyword &mdash;
        </div>
        <div class="header keyword"><router-link class="keyword-link" :to="`/search/keyword/${article.name}`">{{article.name}}</router-link></div>

        <div class="description">
        {{article.title}}
        </div>
      </div>
      <div class="extra content">
        <span class="right floated">
         <a :href="article.link">
         <i class="chain icon"></i> source
         </a>
        </span>
        <span style="float: left">
          <i :class="(article.sentiment > -0.01 && article.sentiment < 0.01 ) ? 'meh icon' : (article.sentiment > 0 ? 'smile icon' : 'frown icon')"></i>
          {{(article.sentiment > -0.01 && article.sentiment < 0.01 ) ? 'mostly neutral' : (article.sentiment > 0 ? 'mostly positive' : 'mostly negative')}}
        </span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'keyword',
  props: ['article', 'index', 'length'],
  computed: {
    ...mapGetters([
      'sourceById'
    ]),
  },
  methods: {
    isMod () {
      console.log('index', this.index);
      console.log('length', this.length);
      return this.index < this.length - (this.length % 3)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,700i');

.centered-and-cropped {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.keyword-link {
  color: black;
}

div.meta {
  transform: translateY(-5px) !important;
}
div.header.keyword {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.5em !important;
}



</style>
