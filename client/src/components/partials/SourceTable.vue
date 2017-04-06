<template>
<table class="ui compact celled definition table">
  <thead>

    <tr>
      <th>{{filter}}</th>
      <th @click="setSourceOrder('name')"><div v-html="rawHtml">{{sortUi('name')}}</div>Name</th>
      <th>Description</th>
      <th @click="setSourceOrder('category')">Category</th>
      <th @click="setSourceOrder('latestArticle')" class="single line">Last Update</th>
      <th @click="setSourceOrder('avg_sentiment')">Score</th>
    </tr>
  </thead>
  <tbody v-for="source in sources">
    <tr>
      <td class="collapsing">
        <div class="ui fitted slider checkbox">
          <input type="checkbox" checked="checked"> <label></label>
        </div>
      </td>
      <td >
        <router-link :to="`/sources/${source.id}`">
          <img
          class="source-logo centered-and-cropped"
          src="../../assets/transparent.png"
          :alt="`logo for ${ source.name }`"
          :style="`background-image: url('${source.logoLink}');`"
          :title="source.name">
        </router-link>
      </td>
      <td><strong>{{ source.name }}:</strong>
      {{source.description}}
      </td>
      <td>{{source.category}}</td>
      <td class="single line">{{ lastUpdate(source.latestArticle) }}</td>
      <td>
        <h2 class="ui center aligned header">{{letterGrade(source.avg_sentiment)}}</h2>
      </td>
    </tr>
  </tbody>
  <tfoot class="full-width">
    <tr>
      <th colspan="6">
        <SourcePaginator :numPages="sourceNumPages"></SourcePaginator>
      </th>
    </tr>
  </tfoot>
</table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SourcePaginator from '@/components/partials/SourcePaginator'
import moment from 'moment'

export default {
  name: 'sourceTable',
  props: ['sources', 'filter'],
  components: { SourcePaginator },
  computed: mapGetters(['letterGrader', 'sourceNumPages']),
  methods: {
    ...mapActions(['toggleSourceFilter', 'setSourceOrder']),
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
    sortUi(name) {
      return '<i class="caret up icon"></i>'
    },
    letterGrade(sentiment) {
      return this.letterGrader(sentiment)
    }
  }
}
</script>

<style scoped>
.source-logo {
  width: 80px;
}

.centered-and-cropped {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

</style>
