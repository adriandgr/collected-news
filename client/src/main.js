// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import '../semantic/dist/semantic.min.css'
import semantic from 'semantic' // importing semantic js

Vue.directive('progress', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    $('#example1').progress()
    $('#example2').progress()
  }
})

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0)
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
