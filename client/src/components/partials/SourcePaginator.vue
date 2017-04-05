<template>
  <div class="ui right floated pagination menu">
    <a class="icon item" @click="prevPage">
      <i class="left chevron icon"></i>
    </a>
    <a
      v-for="n in numPages"
      class="item"
      :data-value="n"
      :class="{active: isActive(n) }"
      @click="setPage">{{n}}</a>
    <a class="icon item" @click="nextPage">
      <i class="right chevron icon"></i>
    </a>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sourcePaginator',
  props: ['numPages'],
  computed: mapGetters(['sourcePagintation']),
  methods: {
    ...mapActions(['updateSourcePage']),
    setPage (event) {

      this.updateSourcePage(Number(event.target.innerText) - 1)
      console.log('yo.. page:', this.sourcePagintation, 'this:', Number(event.target.innerText))
    },
    isActive(p) {
      return this.sourcePagintation === p - 1
    },
    prevPage () {
      let targetPage = this.sourcePagintation - 1
      if (targetPage > 0) {
        this.updateSourcePage(targetPage)
        console.log(this.sourcePagintation)
      } else {
        this.updateSourcePage(this.numPages - 1)
      }
    },
    nextPage () {
      let targetPage = this.sourcePagintation + 1
      if (targetPage < this.numPages) {
        this.updateSourcePage(targetPage)
        console.log(this.sourcePagintation)
      } else {
        this.updateSourcePage(0)
      }
    }
  }
}
</script>

<style scoped>

</style>
