<template>
  <div class="ui raised container segment">
    <h2 class="ui header"> Sources </h2>

      <div v-if="isLoading" class="no-sources">
        <div class="ui active centered inline massive loader"></div>
        <p>{{ fetchMsg }}</p>
        </div>
      <div v-else>


      <div v-if="hasSources" class="three wide column">
        <Source v-for="source in sources" :source="source"></Source>
      </div>
      <div v-else>
        no sources
      </div>

    </div>
  </div>
</template>

<script>
import Source from '@/components/partials/Source'
import { mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'

export default {
  name: 'sources',
  components: { Source },
  data () {
    return {
      fetchMsg: 'waiting for sources ...',
      try: 3,
      show: true
    }
  },
  computed: {
    sources () {
      return this.$store.getters.sources.results
    },
    hasSources () {
      let len = this.$store.getters.sources.results.length
      return len > 0
    },
    isLoading () {
      return this.$store.getters.sources.status === FetchStatus.LOADING
    },
    ...mapActions([
      'getSources'
    ])
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
