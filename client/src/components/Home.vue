<template>
<div class="ui text container">
  <div class="home">
    <h1>{{ msg }}</h1>
    <div class="ui link cards">
      <Keyword img-link="https://i.cbc.ca/1.3979788.1486992268!/cpImage/httpImage/image.jpg_gen/derivatives/4x3_620/trudeau-trump-20170213-topix.jpg"></Keyword>
      <Keyword img-link="http://www.radionz.co.nz/assets/news_crops/30615/eight_col_In_early_times_people_left_calling_cards_like_this.jpg?1490522058"></Keyword>
      <Keyword img-link="http://www.irishtimes.com/polopoly_fs/1.3026785.1490638447!/image/image.jpg_gen/derivatives/landscape_620/image.jpg"></Keyword>
      <Keyword img-link="https://i.cbc.ca/1.3980083.1487001846!/cpImage/httpImage/image.jpg_gen/derivatives/4x3_620/trump-is-canasa.jpg"></Keyword>
      <Keyword img-link="https://i.cbc.ca/1.3981091.1487025592!/fileImage/httpImage/image.jpg_gen/derivatives/4x3_620/usa-trump-canada.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
    </div>

  </div>
  </div>
</template>

<script>
import Keyword from '@/components/partials/Keyword'

export default {
  name: 'home',
  components: {
    Keyword
  },
  data () {
    return {
      msg: 'Home View'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
