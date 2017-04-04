<template>
  <div class="ui center aligned container">
    <SourceChart :data="allSources"></SourceChart>
    <br>
    <KeywordChart :data="topKeywords"></KeywordChart>
    <!-- <Trend v-for="trend in allTrends" :trend="trend"></Trend> -->
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
import KeywordChart from '@/components/partials/KeywordChart.js'
import Trend from '@/components/partials/Trend'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'analytics',
  components: {
    SourceChart,
    Trend,
    KeywordChart
  },
  mounted () {
    // this.retrieveTrends();
    this.setSources();
    this.getKeywords();
    this.getTopKeywords();
  },
  computed: {
    ...mapGetters([
      'sources',
      // 'trends',
      'keywords',
    ]),
    allSources () {
      return this.sources.results
    },
    // allTrends() {
    //   return this.trends.results.data
    // },
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
    },
    topKeywords () {
      return this.keywords.top;
    }
  },
  methods: {
    ...mapActions([
      'retrieveTrends',
      'setSources',
      'getKeywords',
      'getTopKeywords'
    ])
  }
}
</script>

<style scoped>
  .stat {
    width: 20%;
  }
</style>
