<template>
<nav>
  <div class="menu-spacer">
    {{makeSticky()}}
  </div>
  <div class="ui borderless main menu">
    <div class="ui text container">
    <router-link to="/" class="item">
      <div href="#" class="header item">
        <img class="logo" src="../../assets/placeholder.png">
        Collected News
      </div>
      </router-link>
      <router-link to="/sources" class="item">Sources</router-link>
      <a href="#" class="item">Articles</a>
      <a href="#" class="ui right floated dropdown item">
        Your <i class="dropdown icon"></i>
        <div class="menu">
          <div class="item">Saved Articles</div>
          <div class="item">Link Item</div>
          <div class="divider"></div>
          <div class="header">Header Item</div>
          <div class="item">
            <i class="dropdown icon"></i>
            Sub Menu
            <div class="menu">
              <div class="item">Link Item</div>
              <div class="item">Link Item</div>
            </div>
          </div>
          <div class="item">Link Item</div>
        </div>
      </a>
    </div>
  </div>
  </nav>
</template>

<script>
export default {
  name: 'navBar',
  methods: {
    makeSticky: function () {
      $(document)
        .ready(function() {
          // fix main menu to page on passing
          $('.main.menu').visibility({
            type: 'fixed'
          });
          // show dropdown on hover
          $('.main.menu  .ui.dropdown').dropdown({
            on: 'hover'
          });
        })
      ;
    }
  }
}
</script>

<style scoped>

  .main.container {
    margin-top: 2em;
  }
  .menu-spacer {
    height: 50px;
  }

  .main.menu {
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
