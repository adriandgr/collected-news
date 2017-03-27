<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>

    <div class="ui instant move reveal">
      <div class="visible content">
        <img src="./assets/square-image.png" class="ui small image">
      </div>
      <div class="hidden content">
        <img src="./assets/chris.jpg" class="ui small image">
      </div>
    </div>

    <div class="ui link cards">
  <div class="card">
    <div class="image">
      <img src="./assets/chris.jpg">
    </div>
    <div class="content">
      <div class="header">Matt Giampietro</div>
      <div class="meta">
        <a>Friends</a>
      </div>
      <div class="description">
        Matthew is an interior designer living in New York.
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        Joined in 2013
      </span>
      <span>
        <i class="user icon"></i>
        75 Friends
      </span>
    </div>
  </div>
  <div class="card">
    <div class="image">
      <img src="./assets/chris.jpg">
    </div>
    <div class="content">
      <div class="header">Molly</div>
      <div class="meta">
        <span class="date">Coworker</span>
      </div>
      <div class="description">
        Molly is a personal assistant living in Paris.
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        Joined in 2011
      </span>
      <span>
        <i class="user icon"></i>
        35 Friends
      </span>
    </div>
  </div>
  <div class="card">
    <div class="image">
      <img src="./assets/chris.jpg">
    </div>
    <div class="content">
      <div class="header">Elyse</div>
      <div class="meta">
        <a>Coworker</a>
      </div>
      <div class="description">
        Elyse is a copywriter working in New York.
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">
        Joined in 2014
      </span>
      <span>
        <i class="user icon"></i>
        151 Friends
      </span>
    </div>
  </div>
</div>

    <div class="ui inverted segment">
      <div class="ui inverted accordion">
        <div class="active title">
          <i class="dropdown icon"></i>
          What is a dog?
        </div>
        <div class="active content">
          <p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
          What kinds of dogs are there?
        </div>
        <div class="content">
          <p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
          How do you acquire a dog?
        </div>
        <div class="content">
          <p>Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
          <p>A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  },
}


</script>

<style lang="sass">
  @import "~styles/border"
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
