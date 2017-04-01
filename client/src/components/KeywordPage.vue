<template>
  <div>

    <div v-if="search.results.length" class ="ui container" >
      <h1>Search results for <em>{{$route.params.key}}</em></h1>
      <SearchHit v-for="result in search.results" :result="result"></SearchHit>
    </div>

    <div v-else class ="ui raised container segment no-results">
      <h2 class="ui center aligned icon orange header">
        <i class="circular find orange icon"></i>
        No Search Results
      </h2>
      <h3 class="ui center aligned grey header">No keywords matched the query: <em>{{$route.params.key}}</em></h3>
    </div>

  </div>
</template>

<script>
import SearchHit from '@/components/partials/SearchHit'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'keywordPage',
  components: {
    SearchHit
  },
  beforeRouteUpdate (to, from, next) {
    this.match()
    next()
  },
  computed: mapGetters([
    'keywords',
    'search'
  ]),
  methods: {
    ...mapActions([
      'getSearchResults',
      'getKeywords'
    ]),
    match () {
      this.getKeywords()
        .then(() => {
          let matched = false
          this.keywords.results.forEach( keyword => {
            if (keyword.name == this.$route.params.key.toLowerCase()) {
              matched = true
              this.$store.dispatch('getSearchResults', keyword.name)
            }
          })
          if (!matched) {
            this.$store.dispatch('getSearchResults')
          }
        })
    }
  },
  mounted () {
    console.log('calling mounted')
    this.match()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.no-results {
  margin: 5em 0;
}

</style>
