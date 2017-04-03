import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sources from '@/components/Sources'
import SourceArticles from '@/components/SourceArticles'
import Article from '@/components/Article'
import KeywordPage from '@/components/KeywordPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/sources',
      name: 'sources',
      component: Sources
    }, {
      path: '/sources/:id',
      name: 'source-articles',
      component: SourceArticles
    }, {
      path: '/article/:id',
      name: 'article',
      component: Article
    }, {
      path: '/keyword/:key',
      name: 'keyword',
      component: KeywordPage
    }
  ]
})
