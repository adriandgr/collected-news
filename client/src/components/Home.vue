<template>
<div class="ui center aligned container">
  <div v-if="isLoading" class="no-articles">
    <div class="ui active centered inline massive loader"></div>
    <p>{{ fetchMsg }}</p>
  </div>
  <div v-else>

    <div v-if="hasArticles" class="ui three stackable link cards">

        <Keyword v-for="article in topArticles.results" :article="article"></Keyword>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> {{this.data}}</div>
    </div>

    <div v-else>
      no articles
    </div>

  </div>
</div>
</template>

<script>
import Keyword from '@/components/partials/Keyword'
import { mapGetters, mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'
import infiniteScroll from 'vue-infinite-scroll'

var count = 0

export default {
  name: 'home',
  components: { Keyword },
  directives: {infiniteScroll},
  data () {
    return {
      fetchMsg: 'waiting for articles ...',
      data: [],
      busy: false
    }
  },
  methods: {
    ...mapActions([
      'setTopKeywordArticles',
      'incrementKeywordPage'
    ]),
    loadMore: function() {
      this.busy = true;
      setTimeout(() => {
        // this.setTopKeywordArticles(),
        // console.log('get', this.topArticles.pagination)
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  },
  computed: {
    ...mapGetters([
      'topArticles'
    ]),
    distance () {
      return this.nearBottom()
    },
    hasArticles () {
      let len = this.topArticles.results.length
      return len > 0
    },
    isLoading () {
      return this.topArticles.status === FetchStatus.LOADING
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fade-enter-to, .fade-leave-active {
  transition: opacity 1s !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

.no-articles {
  color: #757575;
  font-size: 2em;
  margin-top: 6em;
  margin-bottom: 12em;
}

.no-articles p {
  margin-top: 1em;

}

.ui.link.cards {
  margin-top: 4em;
  margin-bottom: 12em;
}
</style>
