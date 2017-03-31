import axios from 'axios'
import FetchStatus from './constants/fetch-status'

export const getArticles = ({ commit, state }) => {
  state.articles.status = FetchStatus.LOADING
  const timeoutId = setTimeout(() => {
    state.articles.status = FetchStatus.COMPLETE
    commit('getArticles')
  }, 3000)

  axios.get('http://localhost:8000/api/keywords')
  .then(function (response) {
    clearTimeout(timeoutId)
    response.data.forEach(article => {
      const entry = state.articles.results.find(entry => {
        //console.log(article.id)
        return entry.id === article.id
      })
      //console.log('entry', entry)
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

export const getKeywords = ({ commit, state }) => {
  state.keywords.status = FetchStatus.LOADING
  const timeoutId = setTimeout(() => {
    state.keywords.status = FetchStatus.COMPLETE
    commit('getKeywords')
  }, 3000)

  axios.get('http://localhost:8000/api/keywords/all')
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
  })
  .catch(function (error) {
    console.log(error)
  })
}

export const getSearchResult = ({ commit, state }, query) => {
  console.log('PAYLOAD!!', query)
}
