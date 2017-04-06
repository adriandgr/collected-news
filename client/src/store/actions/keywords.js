/*
 *  Actions for articles by top frequency keyword (homepage view)
 */

import axios from 'axios'
import FetchStatus from '../constants/fetch-status'
import Hosts from '../constants/hosts'


export const setTopKeywordArticles = ({ commit, state, getters }) =>
  new Promise((resolve, reject) => {
    state.topArticles.status = FetchStatus.LOADING
    const timeoutId = setTimeout(() => {
      state.topArticles.status = FetchStatus.COMPLETE
      commit('setTopArticles')
      resolve()
    }, 3000)
    axios.get(`${Hosts.ACTIVE}/api/keywords?p=${state.topArticles.pagination}`)
      .then(response => {
        clearTimeout(timeoutId)
        state.topArticles.status = FetchStatus.COMPLETE
        commit('setTopArticles', response.data.filter(article =>
          !getters.topArticlesById(article.id)))
        resolve()
      })
      .catch(error => reject(error))
  })

export const toggleInfinitScroll = ({commit}) =>
  commit('toggleInfinitScroll')

export const incrementKeywordPage = ({ commit, state }) => {
  commit('incrementKeywordPage')
}

export const clearResults = ({commit}) => {
  commit('clearResults')
 }
