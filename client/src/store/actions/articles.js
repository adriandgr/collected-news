/*
 *  Article Actions
 */

import axios from 'axios'
import FetchStatus from '../constants/fetch-status'
import Hosts from '../constants/hosts'


export const addArticleById = ( { commit, state }, id ) =>
  new Promise((resolve, reject) => {
    state.articles.status = FetchStatus.LOADING
    if (!state.articles.results.find(a => a.id === Number(id))) {
      axios.get(`${Hosts.ACTIVE}/api/articles/${id}`)
      .then(res => {
        state.articles.status = FetchStatus.COMPLETE
        commit('addArticles', [res.data])
        resolve(res.data)
      })
      .catch(error => reject(error))
    } else { resolve() }
  })

export const addArticlesBySourceId = ( { commit, state, getters }, id ) =>
  new Promise((resolve, reject) => {
    state.articles.status = FetchStatus.LOADING
    const numArticles = state.articles.results.filter(a =>
      a.sourceId === Number(id)).length
    const source = state.sources.results.find(s =>
      s.id === Number(id))
    const expectedArticles = Number(source ? source.total_articles : 0)

    console.log('Yo... I have', numArticles, 'expected', expectedArticles)
    if (numArticles === expectedArticles) {
      state.articles.status = FetchStatus.COMPLETE
      return resolve('Already have articles in store')
    }

    axios.get(`${HOST_A}/api/sources/${id}`)
      .then(response => {
        state.articles.status = FetchStatus.COMPLETE
        commit('addArticles', response.data.filter(article =>
          !getters.articleById(article.id)))
        resolve('Added new articles')
      })
      .catch(error => reject(error))
  })
