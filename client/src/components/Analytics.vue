<template>
  <div class="ui center aligned container">
    <div class="ui horizontal segments">
      <div class="ui segment">
        <h3 class="ui header">{{ numArticles }} Articles</h3>
      </div>
      <div class="ui segment">
        <h3 class="ui header">{{ numSources }} Sources</h3>
      </div>
      <div class="ui segment">
        <h3 class="ui header">{{ numKeywords }} Keywords</h3>
      </div>
    </div>
    <SourceChart :data="allSources"></SourceChart>
    <br>
    <KeywordChart :data="topKeywords"></KeywordChart>
    <!-- <Trend v-for="trend in allTrends" :trend="trend"></Trend> -->
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
  .segments {
    width: 75%;
  }
  .stat {
    width: 20%;
  }
</style>
