<template>
  <div class="ui raised container segment">
    <h2 class="ui header"> Sources </h2>

      <div v-if="isLoading" class="no-sources">
        <div class="ui active centered inline massive loader"></div>
        <p>{{ fetchMsg }}</p>
      </div>
      <div v-else>
      <div v-if="hasSources" class="three wide column">
        <div class="ui menu">
          <div class="ui category search item">
            <div class="ui transparent icon input">
              <input class="prompt" type="text" placeholder="Search sources...">
              <i class="search link icon"></i>
            </div>
            <div class="results"></div>
          </div>
        </div>
        <SourceTable :sources="sourceRange" :filter="sourceFilter"></SourceTable>
      </div>
      <div v-else>
        no sources
      </div>

    </div>
  </div>
</template>

<script>
import SourceTable from '@/components/partials/SourceTable'
import { mapGetters, mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'

export default {
  name: 'sources',
  components: { SourceTable },
  data () {
    return {
      fetchMsg: 'waiting for sources ...',
      try: 3,
      show: true
    }
  },
  computed: {
    ...mapGetters([
      'paginateSources',
      'sources',
      'sourcePagintation'
    ]),
    allSources () {
      return this.sources.results
    },
    sourceRange () {
      return this.paginateSources(this.sourcePagintation)
    },
    sourceFilter() {
      return this.sources.filter
    },
    hasSources () {
      let len = this.sourceRange.length
      return len > 0
    },
    isLoading () {
      return this.sources.status === FetchStatus.LOADING
    }
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
