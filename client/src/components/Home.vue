<template>
<div class="ui center aligned container">

  <div v-if="isLoading" class="no-articles">
    <div class="ui active centered inline massive loader"></div>
    <p>{{ fetchMsg }}</p>
  </div>
  <div v-else>
    <transition name="fade">
    <div v-if="hasArticles" class="ui three stackable link cards">
      <Keyword v-for="article in articles" :article="article"></Keyword>
    </div>

    <div v-else>
      no articles
    </div>
    </transition>
  </div>

</div>
</template>

<script>
import Keyword from '@/components/partials/Keyword'
import { mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'

export default {
  name: 'home',
  components: { Keyword },
  data () {
    return {
      fetchMsg: 'waiting for articles ...',
      try: 3,
      show: true

    }
  },
  computed: {
    articles () {
      return this.$store.getters.articles.results
    },
    hasArticles () {
      let len = this.$store.getters.articles.results.length
      return len > 0
    },
    isLoading () {
      return this.$store.getters.articles.status === FetchStatus.LOADING
    },
    ...mapActions([
      'getArticles'
    ])
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
