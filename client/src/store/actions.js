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
