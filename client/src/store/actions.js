import axios from 'axios'
import FetchStatus from './constants/fetch-status'

export const getArticles = ({ commit, state }) => {
  state.articles.status = FetchStatus.LOADING
  const timeoutId = setTimeout(() => {
    state.articles.status = FetchStatus.COMPLETE
    commit('getArticles')
  }, 3000)

  axios.get('http://localhost:8000/api/faking')
  .then(function (response) {
    clearTimeout(timeoutId)
    response.data.articles.forEach(article => {
      const entry = state.articles.results.find(entry => {
        return entry.id === article.id
      })
      if (!entry) {
        state.articles.results.push(article)
      }
    })
    state.articles.status = FetchStatus.COMPLETE
    commit('getArticles')
  })
  .catch(function (error) {
    console.log(error)
  })
}

export const getSources = ({ commit, state }) => {
  state.sources.status = FetchStatus.LOADING
  const timeoutId = setTimeout(() => {
    state.sources.status = FetchStatus.COMPLETE
    commit('getSources')
  }, 3000)

  axios.get('http://localhost:8000/api/sources')
  .then(function (response) {
    clearTimeout(timeoutId)
    response.data.forEach(source => {
      const entry = state.sources.results.find(entry => {
        return entry.id === source.id
      })
      if (!entry) {
        state.sources.results.push(source)
      }
    })
    state.sources.status = FetchStatus.COMPLETE
    commit('getSources')
  })
  .catch(function (error) {
    console.log(error)
  })
}
