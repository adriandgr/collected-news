<template>
<div class="container">
  <div class="ui four column doubling stackable grid container">
    <div class="column">
      <h3 class="ui header">{{ source.name }}</h3>
      </div>
      <div class="column">
      23 articles
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'source',
  props: ['source'],
  data: function () {
    return {
      header: 'Sources'
    }
  },
  computed: {
    ...mapGetters([
      'sources'
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

div.header.keyword {
  font-family: 'Playfair Display', serif !important;
  font-size: 1.5em !important;
}



</style>
