<template>
<div class="ui center aligned container">
<div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10">
  <div v-if="isLoading" class="no-articles">
    <p>{{ fetchMsg }}</p>
  </div>

  <div v-else>

    <div v-if="hasArticles" class="ui three stackable link cards">


        <Keyword v-for="(article, index) in fileredTopArticles" :article="article" :index="index" :length="fileredTopArticles.length"></Keyword>
    </div>
    <div v-else>
      <div class="ui active centered inline massive loader"></div>
      Loading
    </div>

  </div>

</div>
</div>
</template>

<script>
import Keyword from '@/components/partials/Keyword'
import { mapGetters, mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'

export default {
  name: 'home',
  components: { Keyword },
  data () {
    return {
      fetchMsg: 'waiting for articles ...',

    }
  },
  methods: {
    ...mapActions([
      'setTopKeywordArticles',
      'toggleInfinitScroll',
      'incrementKeywordPage'
    ]),
    loadMore() {
      this.toggleInfinitScroll()
      console.log('heyo!!')

      setTimeout(() => {
        this.setTopKeywordArticles()
        this.incrementKeywordPage()
        console.log('get', this.topArticles.pagination)
        this.toggleInfinitScroll()
      }, 1000);
    }
  },
  computed: {
    ...mapGetters([
      'fileredTopArticles',
      'topArticles'
    ]),
    busy() {
      return this.topArticles.busy
    },
    hasArticles () {
      let len = this.topArticles.results.length
      return len > 0
    },
    isLoading () {
      if (this.topArticles.status === FetchStatus.LOADING ) {
        this.topArticles.neverLoaded = false
      }
      return this.topArticles.status === FetchStatus.LOADING && this.neverLoaded === true
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
