<template>
  <div class="ui center aligned container">
    <SourceChart :data="allSources"> </SourceChart>
    <Trend v-for="trend in allTrends" :trend="trend"></Trend>
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
  },
  computed: {
    ...mapGetters([
      'sources',
      'trends'
    ]),
    allSources () {
      if(!this.sources.results){
        this.setSources().then(res => {
          return this.sources.results
        })
      }
      return this.sources.results
    },
    allTrends() {
      return this.trends.results.data
    }
  },
  methods: {
    ...mapActions([
      'retrieveTrends',
      'setSources'
    ])
  }
}
</script>

<style scoped>
</style>
