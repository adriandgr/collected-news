<template>
  <div id="app">

    <NavBar></NavBar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import NavBar from '@/components/partials/NavBar';
import Foot from '@/components/partials/Foot';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    NavBar,
    Foot,
  },
  computed: mapGetters(['articleById']),
  methods: mapActions([
    'setTopKeywordArticles',
    'setSources',
    'addArticleById',
    'getKeywords',
    'setTopKeywords',
  ]),
  created() {
    this.setSources();
    this.getKeywords();
    this.setTopKeywordArticles();
    this.setTopKeywords();
  },
};
</script>

<style lang="sass">
  @import "./styles/main"

</style>


