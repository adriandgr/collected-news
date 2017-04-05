import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sources from '@/components/Sources'
import Analytics from '@/components/Analytics'
import SourceArticles from '@/components/SourceArticles'
import Article from '@/components/Article'
import KeywordSearch from '@/components/KeywordSearch'
import ArticleSearch from '@/components/ArticleSearch'
import SourceSearch from '@/components/SourceSearch'

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
      path: '/search/source/:key',
      name: 'source-search',
      component: SourceSearch
    }, {
      path: '/analytics',
      name: 'analytics',
      component: Analytics
    }
  ]
})
