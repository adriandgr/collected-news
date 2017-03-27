<template>
<div class="ui text container">
  <div class="home">
    <h1>{{ msg }}</h1>
    <div class="ui link cards">
      <Keyword :img-link="'girl-died.jpg'"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
      <Keyword img-link="something-else.jpg"></Keyword>
    </div>

  </div>
  </div>
</template>

<script>
import Keyword from '@/components/Keyword'

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
