<template>

  <div class="card">
    <div class="image">
      <img src="../assets/transparent.png" height="290px" class="centered-and-cropped" style="background-image: url('https://i.cbc.ca/1.3979788.1486992268!/cpImage/httpImage/image.jpg_gen/derivatives/4x3_620/trudeau-trump-20170213-topix.jpg');">
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
