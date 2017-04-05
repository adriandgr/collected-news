<template>
<div>
  <div class="column statistic">
    <div class="value">
      {{ numSources }}
    </div>
    <div class="label">
      Sources
    </div>
  </div>
  <div class="column statistic">
    <div class="value">
      {{ numArticles }}
    </div>
    <div class="label">
      Articles
    </div>
  </div>
  <div class="column statistic">
    <div class="value">
      {{ numKeywords }}
    </div>
    <div class="label">
      Keywords
    </div>
  </div>
  <div class="column statistic">
    <div class="value single line">
      {{ lastUpdated }}
    </div>
    <div class="label">
      Last Updated
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'statistics',
  props: ['allSources'],
  mounted () {
    console.log(this.sources);
  },
  computed: {
    lastUpdated () {
      let pubDates = this.sources.results
                       .map(source => { return source.latestArticle })
                       .filter(date => {
                         if(!date || Date.now() - new Date(date) < 0) {
                           return false;
                         }
                         return true;
                       });
      const mostRecent = pubDates.sort((a, b) => { return a > b ? -1 : 1 })[0];
      return moment(mostRecent).fromNow(false);
    },
    numSources () {
      return this.sources.results.length
    },
    numArticles () {
      let n = 0;
      this.sources.results.forEach(source => {
        n += Number(source.total_articles);
      });
      return n;
    },
    numKeywords () {
      return this.keywords.results.length;
    }
  }
}
</script>
