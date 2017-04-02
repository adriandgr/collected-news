<template>
<table class="ui compact celled definition table">
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Description</th>
      <th>Category</th>
      <th>Last Update</th>
      <th>Score</th>
    </tr>
  </thead>
  <tbody v-for="source in sources">
    <tr>
      <td class="collapsing">
        <div class="ui fitted slider checkbox">
          <input type="checkbox" class='checked' > <label></label>
        </div>
      </td>
      <td ><img
      class="source-logo"
      :src="source.logoLink"
      :alt="`logo for ${ source.name }`"
      :title="source.name"></td>
      <td><strong>{{ source.name }}:</strong>
      {{source.description}}
      </td>
      <td>{{source.category}}</td>
      <td class="single line">{{ lastUpdate(source.latestArticle) }}</td>
      <td>
        <h2 class="ui center aligned header">A-</h2>
      </td>
    </tr>
  </tbody>
  <tfoot class="full-width">
    <tr>
      <th colspan="6">
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
import moment from 'moment'

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
    lastUpdate(source) {
      let pubDate = Number(moment(source).format('x'))
      if(!source || pubDate < 0 ) {
        return 'unknown'
      }
      if ( Date.now() - pubDate < 0) {
        console.log('date is in future!')
        return moment(pubDate - 3600000).fromNow()
      }

      return moment(source).fromNow()
    },
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
