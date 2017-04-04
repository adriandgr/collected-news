<template>
  <div>

    <div v-if="done" class ="ui text container" >
      <h1>Search results for <em>{{$route.params.key}}</em></h1>
      <SearchHit v-for="result in results" :result="result"></SearchHit>
      <div v-if="max" class="ui center aligned text container">
      <h2 class="ui center aligned grey header">
        <i class="warning icon"></i>
        <div class="content">
          Too many matches
          <div class="sub header">Truncating results</div>
        </div>
      </h2>
      Your search results returned more than 20 matches. Try narrowing down your search by adding more terms to your query.
      </div>
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
  name: 'articleSearch',
  data() {
    return {
      done: false,
      max: false,
      hitRefs: null
    }
  },
  components: {
    SearchHit
  },
  beforeRouteUpdate (to, from, next) {
    this.match()
    next()
  },
  computed: {
    ...mapGetters([
      'keywords',
      'articleSearch',
      'manyArticlesById'
    ]),

    results() {
      return this.manyArticlesById(this.hitRefs)
    }
  },
  methods: {
    ...mapActions([
      'buildArticleIndex',
      'addArticleById'
    ]),
    match () {
      this.buildArticleIndex()
        .then(() => {
          let refs = this.articleSearch(this.$route.params.key)
          console.log('searching for', refs)
          if (!refs.length) {
            console.log('nothing!')
            return false
          }
          let results = []
          Promise.all(refs.map((ref) => this.addArticleById(ref))).then((articles) => {
            articles.forEach(article => {
              results.push(article)
            })
            console.log(results)
            this.done = true
            if (refs.length >= 20) {
              this.max = true
            } else {
              this.max = false
            }

            this.hitRefs = refs
          })
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
