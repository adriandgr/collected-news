import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import FetchStatus from './constants/fetch-status'
import lunr from 'lunr'

Vue.use(Vuex)
console.log(getters)

const state = {
  topArticles: {
    status: FetchStatus.INIT,
    pagination: 0,
    busy: false,
    neverLoaded: true,
    results: []
  },
  articles: {
    status: FetchStatus.INIT,
    results: []
  },
  sources: {
    status: FetchStatus.INIT,
    pagination: 0,
    results: []
  },
  keywords: {
    status: FetchStatus.INIT,
    results: []
  },
  lunr: {
    status: FetchStatus.INIT,
    idx: lunr(function () {
      this.field('title', { boost: 10 })
      this.field('snippet')
    })
  },
  keyLunr: {
    status: FetchStatus.INIT,
    idx: lunr(function () {
      this.field('title', { boost: 10 })
      this.field('snippet')
    })
  },
  keywordSearch: {
    status: FetchStatus.INIT,
    results: []
  },
  trends: {
    results: []
  }
}

const store = new Vuex.Store({
  state,
  ...getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
