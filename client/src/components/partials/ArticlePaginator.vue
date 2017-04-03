<template>
  <div>
  <router-link :to="`/article/${article.id}`">
    <h3 class="ui header">{{article.title}}</h3>
  </router-link>
  <p>{{article.snippet}}</p>
  <div class="ui section divider"></div>
  </div>
</template>

<script>
export default {
  name: 'ArticlePaginator',
  props: ['article']
}
</script>
