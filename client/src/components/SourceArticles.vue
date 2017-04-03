<template>

<div class="ui text container">

  <div class="large ui fluid buttons">
    <router-link :to="`/sources/${source.id + - 1}`">
      <button class="ui labeled icon button">
        <i class="left arrow icon"></i>
        Previous Source
      </button>
    </router-link>

    <button class="ui button">
      <i class="newspaper icon"></i>
      {{source.name}}
    </button>

    <router-link :to="`/sources/${source.id + 1}`">
      <button class="ui right labeled icon button">
        <i class="right arrow icon"></i>
        Next Source
      </button>
    </router-link>
  </div>




<div class="ui raised container segment">

    <ArticlePaginator
      v-for="article in articles"
      :article="article"></ArticlePaginator>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticlePaginator from '@/components/partials/ArticlePaginator'

export default {
  name: 'SourceArticles',
  components: { ArticlePaginator },
  beforeRouteUpdate (to, from, next) {
    this.setSources().then(msg =>
      this.addArticlesBySourceId(this.$route.params.id))
    next()
  },
  computed: {
    ...mapGetters(['getArticlesBySourceId', 'getSourceById']),
    articles() {
      return this.getArticlesBySourceId(this.$route.params.id)
    },
    source () {
      return this.getSourceById(this.$route.params.id)
    }
  },
  methods: mapActions(['addArticlesBySourceId','setSources']),
  created () {
    this.setSources().then(msg =>
      this.addArticlesBySourceId(this.$route.params.id))
  }
}
</script>

<style scoped>

</style>
