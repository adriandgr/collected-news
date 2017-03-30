<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import NavBar from '@/components/partials/NavBar'
import Foot from '@/components/partials/Foot'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    NavBar,
    Foot
  },
  methods: mapActions([
    'getArticles',
    'getSources'
  ]),
  created () {
    this.getArticles(),
    this.getSources()
  }
}
</script>

<style lang="sass">
  @import "./styles/main"

</style>


