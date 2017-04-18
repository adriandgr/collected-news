<template>
  <div class="ui">
    <!-- remove disabled class -->
    <div class="ui right action left icon input disabled">
      <input
        class="prompt"
        type="text"
        placeholder="Search is disabled"
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
          <div class="item" data-value="article-search">article</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'lunrSearch',
  data() {
    return {
      searchTerm: '',
      loading: false,
    }
  },
  methods: {
    hit () {
      let route = $('#search-by').dropdown('get value') || 'keyword-search'
      this.$router.push({ name: route, params: { key: this.searchTerm }})
      this.searchTerm = ''
      console.log('search by', route)
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
  }
}
</script>
