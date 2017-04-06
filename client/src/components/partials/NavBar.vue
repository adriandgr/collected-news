<template>
<nav>
  <div class="menu-spacer">
  </div>
  <div class="ui borderless main menu">
    <div class="ui container">
    <router-link to="/" class="item">
      <div href="#" class="header item" v-on:click="scrollTop">
        <img class="logo" src="../../assets/placeholder.png">
        Collected News
      </div>
      </router-link>
      <router-link to="/sources" class="item">Sources</router-link>

      <router-link to="/analytics" class="item">Analytics</router-link>
      <router-link to="/about" class="item">About</router-link>

      <div class="floated right item">
      <div class="ui">
        <div class="ui right action left icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Search by"
            @keyup.enter="hit"
            @blur="reset"
            @input="searching"
            v-model="searchTerm">
          <i class="search icon"></i>
          <div class="ui basic floating dropdown button" value="keyword-search" id="search-by">
            <div class="text">keyword</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" data-value="keyword-search">keyword</div>
              <div class="item" data-value="article-search" @click="searchingBy()">article</div>
              <div class="item" data-value="source-search">source</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <!-- <div class="floated right item">
        <div class="ui right action left icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Search"
            @keyup.enter="hit"
            @blur="reset"
            @input="searching"
            v-model="searchTerm">
            <i class="search icon"></i>
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
      </div> -->
    </div>
  </div>

  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'navBar',
  data() {
    return {
      searchTerm: '',
      loading: false,
      //keys: this.$store.getters.keywords.results
    }
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  methods: {
    ...mapActions([
      ''
    ]),
    scrollTop () {
      window.scrollTo(0, 0)
    },
    hit () {
      let route = $('#search-by').dropdown('get value') || 'keyword-search'
      this.$router.push({ name: route, params: { key: this.searchTerm }})
      this.searchTerm = ''
      console.log('search by', route)

    },
    searchingBy() {
      let search = $('#search-by').dropdown('get value')
      if (search === 'article-search') {
        return 'Search articles'
      }
      if (search === 'source-search') {
        return 'Search sources'
      }
      return 'Search keywords'
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
    var content = [
    {
      title: 'Horse',
      description: 'An Animal',
    },
    {
      title: 'Cow',
      description: 'Another Animal',
    }
  ];


    $('.ui.search')
      .search({
        source : this.keywords.results,
        searchFields   : [
          'name'
        ],
        fields: {
      title   : 'name',

    },
        minCharacters : 1
      })
    ;


    // fix main menu to page on passing
          $('.main.menu').visibility({
            type: 'fixed'
          });
          // show dropdown on hover
          $('.main.menu  .ui.dropdown').dropdown({
            on: 'click'
          });


    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      $(document)
        .ready(function() {





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
  .results.transition.visible {
    font-size: 2em;
  }
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
