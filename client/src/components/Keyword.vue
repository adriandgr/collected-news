<template>

  <div class="card">
    <div class="image">
      <img :src="hey" class="centered-and-cropped">
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
export default {
  name: 'keyword',
  props: ['imgLink'],
  data: {
    hey: '../assets/chris.jpg'
  },
  computed: {
    imgPath: function () {
      return `../assets/${this.imgLink}`
    }
  }
}
</script>

<style scoped>
.centered-and-cropped {
  object-fit: cover;
  width: 290px;
  height: 260px;
}
</style>
