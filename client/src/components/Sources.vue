<template>
  <div class="ui text container">

  <div v-if="isLoading" class="no-sources">
    <div class="ui active centered inline massive loader"></div>
    <p>{{ fetchMsg }}</p>
  </div>
  <div v-else>
    <transition name="fade">
    <div v-if="hasSources" class="ui three stackable link cards">
      <div v-for="source in sources" :source="source"></div>
    </div>

    <div v-else>
      no sources
    </div>
    </transition>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FetchStatus from '@/store/constants/fetch-status'

export default {
  name: 'sources',
  data () {
    return {
      fetchMsg: 'waiting for sources ...',
      try: 3,
      show: true
    }
  },
  computed: {
    sources () {
      return this.$store.getters.sources.results
    },
    hasSources () {
      let len = this.$store.getters.sources.results.length
      console.log(len, len > 0)
      return len > 0
    },
    isLoading () {
      return this.$store.getters.sources.status === FetchStatus.LOADING
    },
    ...mapActions([
      'getSources'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.no-sources {
  color: #757575;
  font-size: 2em;
  margin-top: 6em;
  margin-bottom: 12em;
}

.no-sources p {
  margin-top: 1em;

}

.ui.link.cards {
  margin-top: 4em;
  margin-bottom: 12em;
}

</style>
