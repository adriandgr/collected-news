<template>

  <div class="ui segment">
    {{ trend.keyword }}
    <div class="trend">
      <TrendChart :data="trend" :height="200" :width="400"></TrendChart>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TrendChart from '@/components/partials/TrendChart.js'

export default {
  name: 'trends',
  components: { TrendChart },
  props: ['trend'],
}
</script>

<style scoped>
</style>
