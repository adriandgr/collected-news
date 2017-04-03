<template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'trends',
  props: ['keyword'],
  computed: mapGetters([
    'getTrend'
  ])
  methods: {
    ...mapActions([
      'setTrends'
    ])
  }
}
</script>

<style scoped>

</style>
