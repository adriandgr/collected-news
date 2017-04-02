import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import FetchStatus from './constants/fetch-status'

Vue.use(Vuex)

const state = {
  topArticles: {
    status: FetchStatus.INIT,
    pagination: 0,
    results: []
  },
  articles: {
    status: FetchStatus.INIT,
    results: []
  },
  sources: {
    status: FetchStatus.INIT,
    results: []
  },
  keywords: {
    status: FetchStatus.INIT,
    results: []
  },
  search: {
    status: FetchStatus.INIT,
    results: []
  }
}

const store = new Vuex.Store({
  state,
  getters,
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
