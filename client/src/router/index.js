import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sources from '@/components/Sources'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/sources',
      name: 'Sources',
      component: Sources
    }
  ]
})
