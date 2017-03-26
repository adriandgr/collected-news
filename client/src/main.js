// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App'
import router from './router'

// configure language
locale.use(lang)

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* or
 * Vue.use(Button)
 * Vue.use(Select)
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
