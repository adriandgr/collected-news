<template>

  <div class="card">
    <div class="image">
      <img src="../../assets/transparent.png" class="centered-and-cropped" :style="`background-image: url('${imgPath}');`">
    </div>
    <div class="content">
    <div class="meta">
        <a>keyword</a>
      </div>
      <div class="header">Girl Died</div>

      <div class="description">
        Death toll in Guatemala shelter fire rises to 41
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        mostly neutral
      </span>
     <!--  <span>
        <i class="user icon"></i>
        75 Friends
      </span> -->
    </div>
  </div>

</template>

<script>
let data = {
  hey: '../assets/chris.jpg'
}
export default {
  name: 'keyword',
  props: ['imgLink'],
  data: function () {
    return data
  },
  computed: {
    imgPath: function () {
      return this.imgLink
    }
  }
}
</script>

<style scoped>
.centered-and-cropped {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

}
</style>
