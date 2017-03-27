<template>
  <div id="app">

    <NavBar></NavBar>



    <router-view></router-view>









  <Footer></Footer>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    NavBar,
    Footer
  }
}

</script>

<style lang="sass">
  @import "~styles/border"
</style>


