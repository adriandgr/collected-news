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
