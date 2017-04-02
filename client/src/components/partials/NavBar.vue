<template>
<nav>
  <div class="menu-spacer">
  </div>
  <div class="ui borderless main menu">
    <div class="ui container">
    <router-link to="/" class="item">
      <div href="#" class="header item">
        <img class="logo" src="../../assets/placeholder.png">
        Collected News
      </div>
      </router-link>
      <router-link to="/sources" class="item">Sources</router-link>
      <a href="#" class="item">Articles</a>
      <router-link to="/analytics" class="item">Analytics</router-link>

      <div class="floated right item">
        <div class="ui right action left icon input">
          <i class="search icon"></i>
          <input
            type="text"
            placeholder="Search"
            @keyup.enter="hit"
            @blur="reset"
            @input="searching"
            v-model="searchTerm">
          <div class="ui basic floating dropdown button" id="search-by">
            <div class="text">by</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" data-value="keyword">keyword</div>
              <div class="item" data-value="article">article</div>
              <div class="item" data-value="source">source</div>
            </div>
          </div>
        </div>
    </div>
    </div>
  </div>

  </nav>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      searchTerm: '',
      loading: false,
      keys: this.$store.getters.keywords.results
    }
  },
  computed: {
    keywords() {
      return this.$store.getters.keywords.results
    }
  },
  methods: {
    hit () {
      this.$router.push({ name: 'keyword', params: { key: this.searchTerm }})
      this.searchTerm = ''
      //console.log('search by', $('#search-by').dropdown('get value'))

    },
    reset () {
      this.searchTerm = ''
    },
    searching () {
      if (!this.loading) {
        this.loading = true
        $('.ui.right.action.left.icon.input').addClass('loading')
        setTimeout(()=>{
          $('.ui.right.action.left.icon.input').removeClass('loading')
          this.loading = false
        },800)
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      $(document)
        .ready(function() {
          // fix main menu to page on passing
          $('.main.menu').visibility({
            type: 'fixed'
          });
          // show dropdown on hover
          $('.main.menu  .ui.dropdown').dropdown({
            on: 'click'
          });
          var content = this

          $('.ui.search')
            .search({
              source : content,
              searchFields   : [
                'name'
              ],
              searchFullText: false
            })
          ;

          //   .search({
          //     apiSettings: {
          //       url: '//localhost:8000/api/articles/{query}'
          //     },
          //     fields: {
          //       results : 'title',
          //       title   : 'title'
          //     },
          //     minCharacters : 1
          //   })
          // ;

        });
    })
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
