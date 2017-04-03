<template>
  <div class="ui center aligned container">
    <SourceChart :data="allSources" > </SourceChart>
    <Trend v-for="trend in allTrends" :trend="trend"></Trend>
    <div class="ui segment raised stat">
      <h1 class="ui">{{ numArticles }} Articles</h1>
    </div>
    <div class="ui segment raised stat">
      <h1 class="ui">{{ numSources }} Sources</h1>
    </div>
    <div class="ui segment raised stat">
      <h1 class="ui">{{ numKeywords }} Keywords</h1>
    </div>
  </div>

</template>

<script>
import SourceChart from '@/components/partials/SourceChart.js'
import Trend from '@/components/partials/Trend'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'analytics',
  components: { SourceChart, Trend },
  mounted () {
    this.retrieveTrends();
    this.setSources();
    this.getKeywords();
  },
  computed: {
    ...mapGetters([
      'sources',
      'trends',
      'keywords'
    ]),
    allSources () {
      return this.sources.results
    },
    allTrends() {
      return this.trends.results.data
    },
    numSources () {
      return this.sources.results.length
    },
    numArticles () {
      let n = 0;
      this.sources.results.forEach(source => {
        n += Number(source.total_articles);
      });
      return n;
    },
    numKeywords () {
      return this.keywords.results.length;
    }
  },
  methods: {
    ...mapActions([
      'retrieveTrends',
      'setSources',
      'getKeywords'
    ])
  }
}
</script>

<style scoped>
  .stat {
    width: 20%;
  }
</style>
