import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Analytics from '@/components/Analytics'
import Article from '@/components/Article'
import ArticleSearch from '@/components/ArticleSearch'
import Home from '@/components/Home'
import KeywordSearch from '@/components/KeywordSearch'
import SourceArticles from '@/components/SourceArticles'
import Sources from '@/components/Sources'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/search/keyword/:key',
      name: 'keyword-search',
      component: KeywordSearch
    }, {
      path: '/search/article/:key',
      name: 'article-search',
      component: ArticleSearch
    }, {
      path: '/about',
      name: 'about',
      component: About
    }, {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    }
  ]
})
