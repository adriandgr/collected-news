<template>
  <div class="ui center aligned container">
    <SourceChart :data="allSources"> </SourceChart>
    {{ retrieveTrends(['trump']) }}
  </div>
</template>

<script>
import SourceChart from '@/components/partials/SourceChart.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'analytics',
  components: { SourceChart },
  computed: {
    ...mapGetters([
      'sources',
    ]),
    allSources () {
      return this.sources.results
    },
    trends() {
    }
  },
  methods: {
    ...mapActions([
      'retrieveTrends'
    ])
  }
}
</script>

<style scoped>
</style>
