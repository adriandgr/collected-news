/*
 *  Lunr Search Helper Actions
 */

import axios from 'axios'
import FetchStatus from '../constants/fetch-status'
import Hosts from '../constants/hosts'
import lunr from 'lunr'


export const buildArticleIndex = ({ commit, state, getters }) => {
  return new Promise ((resolve, reject) => {
    state.lunr.loading = FetchStatus.LOADING
    if (Date.now() - state.lunr.status < 600000) {
      return resolve()
    }
    axios.get(`${Hosts.ACTIVE}/api/articles/all`)
    .then(response => {
      const newDocs = response.data.filter(doc =>
        !getters.lunrDocById(doc.id))

      commit('addLunrArticleDoc', newDocs)
      commit('indexLunrArticleDoc', newDocs)
      state.lunr.status = Date.now()
      state.lunr.loading = FetchStatus.COMPLETE
      resolve()
    })
    .catch(error => reject(error))
  })


}

// TODO replace with lunr
export const getKeywordSearch = ({ commit, state }, query) => {
  return new Promise ((resolve, reject) => {
    state.keywordSearch.status = FetchStatus.LOADING
    console.log(query)
    let results = []
    axios.get(`${Hosts.ACTIVE}/api/keywords/${query}`)
    .then(function (response) {
      response.data.forEach(article => {
        results.push(article)
      })
      state.keywordSearch.status = FetchStatus.COMPLETE
      commit('getKeywordSearch', results)
      resolve()
    })
    .catch(error => reject(error))
  })
}

export const getKeywords = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    state.keywords.status = FetchStatus.LOADING

    const timeoutId = setTimeout(() => {
      state.keywords.status = FetchStatus.COMPLETE
      commit('getKeywords')
      resolve()
    }, 3000)

    axios.get(`${Hosts.ACTIVE}/api/keywords/all`)
    .then(function (response) {
      clearTimeout(timeoutId)
      response.data.forEach(keyword => {
        const entry = state.keywords.results.find(entry => {
          return entry.id === keyword.id
        })
        if (!entry) {
          state.keywords.results.push(keyword)
        }
      })
      state.keywords.status = FetchStatus.COMPLETE
      commit('getKeywords')
      resolve()
    })
    .catch(function (error) {
      console.log(error)
      reject()
    })
  })
}

