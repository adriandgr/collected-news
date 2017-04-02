<template>
  <div class="ui raised container segment group">

    <img src="../../assets/transparent.png"
    class="ui floated tiny rounded image centered-and-cropped"
    :style="`background-image: url('${result.leadImageUrl}');`">
    <router-link :to="`/article/${result.id}`"><h2>{{result.title}}</h2></router-link>

    <p>{{result.snippet}}</p>

  </div>
</template>

<script>
export default {
  name: 'searchHit',
  props: ['result']
}
</script>

<style scoped>
.group:after {
  content: "";
  display: table;
  clear: both;
}

.centered-and-cropped {

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
