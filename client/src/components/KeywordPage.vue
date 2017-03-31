<template>
  <div class="ui raised container segment">
    {{$route.params}} {{results}}
    <div v-for="result in results">
      {{result}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'keywordPage',
  computed: {
    keywords () {
      return this.$store.getters.keywords.results
    },
    results () {
      const results = []
      this.keywords.forEach( keyword => {

        if (keyword.name == this.$route.params.id.toLowerCase()) {
          axios.get(`http://localhost:8000/api/articles/${keyword.id}`)
          .then(function (response) {
            response.data.forEach(article => {
              console.log(article)
                results.push(article)
              })
            })

          .catch(function (error) {
            console.log(error)
          })
        }
      })


      return results
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
