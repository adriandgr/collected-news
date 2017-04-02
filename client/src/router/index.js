import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sources from '@/components/Sources'
import Analytics from '@/components/Analytics'
import Article from '@/components/Article'
import KeywordPage from '@/components/KeywordPage'

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
    }, {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }, {
      path: '/keyword/:key',
      name: 'keyword',
      component: KeywordPage
    }, {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    }
  ]
})
