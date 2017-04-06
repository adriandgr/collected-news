<template>
  <div>
    <div v-if="isLoading()" class="loading">
      <div class="ui active centered inline massive loader"></div>
    </div>
    <div v-else>
      <div v-if="keywordSearch.results.length" class ="ui container" >
        <h1>Search results for <em>{{$route.params.key}}</em></h1>
        <SearchHit v-for="result in keywordSearch.results" :result="result"></SearchHit>
      </div>

      <div v-else class ="ui raised container segment no-results">
      <br><br><br>
        <h2 class="ui center aligned icon orange header">
          <i class="circular find orange icon"></i>

          No Search Results

        </h2>
        <h3 class="ui center aligned grey header">No keywords matched the query: <em>{{$route.params.key}}</em></h3>
        <br><br><br>
          <br><br><br>
      </div>
    </div>
  </div>
</template>

<script>
import SearchHit from '@/components/partials/SearchHit'
import FetchStatus from '@/store/constants/fetch-status'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'keywordSearch',
  components: {
    SearchHit
  },
  beforeRouteUpdate (to, from, next) {
    //this.clearResults()
    this.match()
    next()
  },
  computed: mapGetters([
    'keywords',
    'keywordSearch'
  ]),
  methods: {
    ...mapActions([
      'getKeywordSearch',
      'getKeywords',
      'clearResults'
    ]),
    match () {
      this.getKeywords()
        .then(() => {
          let matched = false
          this.keywords.results.forEach( keyword => {
            if (keyword.name == this.$route.params.key.toLowerCase()) {
              matched = true
              console.log(keyword.name)
              this.$store.dispatch('getKeywordSearch', keyword.name)
            }
          })
          if (!matched) {
            this.$store.dispatch('getKeywordSearch')
          }
        })
    },
    isLoading () {
      return this.keywords.status === FetchStatus.LOADING
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

.loading {
  color: #757575;
  font-size: 2em;
  margin-top: 6em;
  margin-bottom: 12em;
}

.no-results {
  margin-top: 6em;
  margin-bottom: 12em;
  margin: 5em 0;
}

</style>
