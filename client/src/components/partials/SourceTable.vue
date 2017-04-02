<template>
<table class="ui compact celled definition table">
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Description</th>
      <th>Last Update</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody v-for="source in sources">
    <tr>
      <td class="collapsing">
        <div class="ui fitted slider checkbox">
          <input type="checkbox"> <label></label>
        </div>
      </td>
      <td ><img
      class="source-logo"
      :src="source.Source.logoLink"
      :alt="`logo for ${source.Source.name}`"
      :title="source.Source.name"></td>
      <td>{{ source.Source.description }}</td>
      <td class="single line">2 hours ago</td>
      <td>
        <h2 class="ui center aligned header">A-</h2>
      </td>
    </tr>
  </tbody>
  <tfoot class="full-width">
    <tr>
      <th colspan="5">
        <div class="ui right floated pagination menu">
          <a class="icon item" @click="prevPage">
            <i class="left chevron icon"></i>
          </a>
          <a class="item" :class="{active: this.getSourcePagintation === 0}" @click="setPage">1</a>
          <a class="item" :class="{active: this.getSourcePagintation === 1}" @click="setPage">2</a>
          <a class="item" :class="{active: this.getSourcePagintation === 2}" @click="setPage">3</a>
          <a class="item" :class="{active: this.getSourcePagintation === 3}" @click="setPage">4</a>
          <a class="icon item" @click="nextPage">
            <i class="right chevron icon"></i>
          </a>
        </div>


      </th>
    </tr>
  </tfoot>
</table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sourceTable',
  props: ['sources'],
  computed: mapGetters([
    'getSourcePagintation'
  ]),
  methods: {
    ...mapActions([
      'updateSourcePage'
    ]),
    setPage (event) {
      this.updateSourcePage(Number(event.target.innerText) - 1)
      console.log(this.getSourcePagintation)
      //console.log(event.target.innerText)
    },
    prevPage () {
      let targetPage = this.getSourcePagintation - 1
      this.updateSourcePage(targetPage)
    },
    nextPage () {
      let targetPage = this.getSourcePagintation + 1
      this.updateSourcePage(targetPage)
    }
  }
}
</script>

<style scoped>
.source-logo {
  width: 80px;
}
</style>
