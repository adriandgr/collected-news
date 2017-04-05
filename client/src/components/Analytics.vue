<template>
  <div class="ui center aligned container">
      <div class="ui four column grid tiny statistics">
      <div class="row">
        <div class="column statistic">
          <div class="value">
            {{ numSources }}
          </div>
          <div class="label">
            Sources
          </div>
        </div>
        <div class="column statistic">
          <div class="value">
            {{ numArticles }}
          </div>
          <div class="label">
            Articles
          </div>
        </div>
        <div class="column statistic">
          <div class="value">
            {{ numKeywords }}
          </div>
          <div class="label">
            Keywords
          </div>
        </div>
        <div class="column statistic">
          <div class="value single line">
            {{ lastUpdated }}
          </div>
          <div class="label">
            Last Updated
          </div>
        </div>
        </div>
      </div>
      <SourceChart v-if="allSources" :data="allSources"></SourceChart>
      <br>
      <KeywordChart v-if="topKeywords" :data="topKeywords"></KeywordChart>
      <!-- <Trend v-for="trend in allTrends" :trend="trend"></Trend> -->
  </div>

</template>

<script>
import SourceChart from '@/components/partials/SourceChart.js'
import KeywordChart from '@/components/partials/KeywordChart.js'
import Trend from '@/components/partials/Trend'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

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
    this.setTopKeywords();
  },
  computed: {
    ...mapGetters([
      'sources',
      // 'trends',
      'keywords'
    ]),
    allSources () {
      return this.sources.results;
    },
    topKeywords () {
      return this.keywords.top;
    },
    lastUpdated () {
      let pubDates = this.sources.results
                       .map(source => { return source.latestArticle })
                       .filter(date => {
                         if(!date || Date.now() - new Date(date) < 0) {
                           return false;
                         }
                         return true;
                       });
      const mostRecent = pubDates.sort((a, b) => { return a > b ? -1 : 1 })[0];
      return moment(mostRecent).fromNow(false);
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
    }
  },
  methods: {
    ...mapActions([
      // 'retrieveTrends',
      'setSources',
      'setTopKeywords'
    ])
  }
}
</script>

<style scoped>
  .inner {
    margin: 0 auto;
    text-align: center;
    width: 90%;
  }
  .ui.grid>.column:not(.row), .ui.grid>.row>.column {
    padding: 0;
  }
</style>
