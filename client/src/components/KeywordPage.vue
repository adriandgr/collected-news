<template>
  <div class="ui raised container segment">
    {{$route.params}} {{results}}
    <div v-for="result in results">
      {{result}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'keywordPage',
  beforeRouteUpdate (to, from, next) {
    this.match()
    next()
  },
  data () {
    return {
      results: []
    }
  },
  computed: mapGetters([
    'keywords',
    'keywordStatus'
  ]),
  methods: {
    ...mapActions([
      'saveSearchResults',
      'getKeywords'
    ]),
    match () {
      this.getKeywords()
        .then(() => {
          this.keywords.forEach( keyword => {
            if (keyword.name == this.$route.params.id.toLowerCase()) {
              console.log('mathced!')
              this.$store.dispatch('saveSearchResults', keyword.id)
            }
          })
        })
    }
  },
  mounted: function () {
    console.log('calling mounted')
    this.match()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.no-sources {
  color: #757575;
  font-size: 2em;
  margin-top: 6em;
  margin-bottom: 12em;
}

.no-sources p {
  margin-top: 1em;

}

.ui.link.cards {
  margin-top: 4em;
  margin-bottom: 12em;
}
</style>
