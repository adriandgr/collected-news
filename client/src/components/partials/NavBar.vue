<template>
<nav>
  <div class="menu-spacer"></div>
  <div class="ui borderless main menu">
    <div class="ui container">
      <router-link to="/" class="item">
        <div href="#" class="header item site-name" v-on:click="scrollTop">
          <img class="logo" src="../../assets/logo.png"> Collected News
        </div>
      </router-link>

      <router-link to="/sources" class="item">Sources</router-link>
      <router-link to="/analytics" class="item">Analytics</router-link>
      <router-link to="/about" class="item">About</router-link>

      <div class="floated right item">
        <LunrSearch></LunrSearch>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import LunrSearch from '@/components/partials/LunrSearch'

export default {
  name: 'navBar',
  components: { LunrSearch },
  methods: {
    scrollTop () {
      window.scrollTo(0, 0)
    },
  },
  mounted: function () {

    // fix main menu to page on passing
    $('.main.menu').visibility({
      type: 'fixed'
    });
    // show dropdown on click
    $('.main.menu  .ui.dropdown').dropdown({
      on: 'click'
    });

  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:700');

  .results.transition.visible {
    font-size: 2em;
  }
  .main.container {
    margin-top: 2em;
  }
  .menu-spacer {
    height: 50px;
  }
  .site-name {
    font-size: 1.8em !important;
  }

  .main.menu {
    background-color: #f1f1f1;
    margin-top: 4em;
    border-radius: 0;
    border: none !important;
    box-shadow: none !important;
    transition:
      box-shadow 0.5s ease,
      padding 0.5s ease
    ;
  }
  .main.menu .item img.logo {
    margin-right: 1.5em;
    width: 100px;
  }


  .main.menu.fixed {
    background-color: #FFFFFF;
    border: 1px solid #DDD !important;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2) !important;
  }

  .main.menu.fixed img.logo {
    width: 50px;
  }

  .text.container .left.floated.image {
    margin: 2em 2em 2em -4em;
  }
  .text.container .right.floated.image {
    margin: 2em -4em 2em 2em;
  }

</style>
