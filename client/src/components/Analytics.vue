<template>
  <div class="ui center aligned container">
    <SourceChart :data="allSources"> </SourceChart>
  </div>
</template>

<script>
import SourceChart from '@/components/partials/SourceChart.js'
import { mapGetters } from 'vuex'

export default {
  name: 'analytics',
  components: { SourceChart },
  computed: {
    ...mapGetters([
      'sources',
    ]),
    allSources () {
      return this.sources.results
    }
  }
}
</script>

<style scoped>
</style>
