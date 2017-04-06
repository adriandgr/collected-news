<template>
  <div class="ui inverted vertical footer segment">
    <div class="ui center aligned container">
      <img src="../../assets/logo-inverted.png" class="ui centered mini image">
      <div class="ui horizontal inverted small divided link list">
        <router-link class="item" to="/">Collected News</router-link>
        <a class="item" href="https://newsapi.org/">powered by News API</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>
  .ui.footer.segment {
    margin: 2em 0em 0em;
    padding: 2em 0em;
  }
</style>
