<template>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ["data"],
  mounted () {
    this.renderChart(this.data)
  }
})
</script>

<style scoped>
</style>
