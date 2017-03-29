<template>
    <div :class="(article.sentiment > -0.1 && article.sentiment < 0.1 ) ? 'ui grey centered card' : (article.sentiment > 0 ? 'ui olive centered card' : 'ui red centered card')">
      <a class="image" :href="article.link">
        <img src="../../assets/transparent.png" class="centered-and-cropped" :style="`background-image: url('${article.leadImageUrl}');`">
      </a>
      <div class="content">
      <div class="meta">
          &mdash; keyword &mdash;
        </div>
        <div class="header keyword">{{article.name}}</div>

        <div class="description">
        {{article.title}}
        </div>
      </div>
      <div class="extra content">
        <span class="right floated">

        </span>
        <span>
          <i :class="(article.sentiment > -0.1 && article.sentiment < 0.1 ) ? 'meh icon' : (article.sentiment > 0 ? 'smile icon' : 'frown icon')"></i>
          {{(article.sentiment > -0.1 && article.sentiment < 0.1 ) ? 'mostly neutral' : (article.sentiment > 0 ? 'mostly positive' : 'mostly negative')}}
        </span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
let data = {
  hey: '../assets/chris.jpg'
}
export default {
  name: 'keyword',
  props: ['article'],
  data: function () {
    return data
  },
  computed: {
    ...mapGetters([
      'articles'
    ])
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

div.meta {
  transform: translateY(-5px) !important;
}
div.header.keyword {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.5em !important;
}



</style>
