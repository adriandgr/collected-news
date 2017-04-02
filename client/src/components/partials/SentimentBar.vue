<template>
  <div class="">
    <table>
      <tr>
        <td>
          <div
            :class="sentiment < 0 ? 'ui red tiny progress flipped' : 'ui disabled tiny progress flipped'"
            :data-percent="sentiment < 0 ? Math.abs(sentiment)-1 : 99" id="example1">
            <div class="bar" v-progress></div>
          </div>
        </td>

        <td>
          <div
            :class="sentiment >= 0 ? 'ui green tiny progress' : 'ui disabled tiny progress'"
            :data-percent="sentiment >= 0 ? sentiment : 99" id="example2">
            <div class="bar"v-progress></div>
          </div>
        </td>
      </tr>
    </table>
    <div class="sentiment-score">sentiment score: {{sentiment}}</div>
  </div>
</template>

<script>
export default {
  name: 'sentimentBar',
  props: ['sentiment']
}
</script>

<style scoped>
.sentiment-score {
  float: right;
  transform: translate(-5px, -15px);
}

table {
    width: 100%;
}
.flipped {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}
</style>
