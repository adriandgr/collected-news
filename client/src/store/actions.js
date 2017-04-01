import axios from 'axios'
import FetchStatus from './constants/fetch-status'

export const setTopKeywordArticles = ({ commit, state }) => {
  state.topArticles.status = FetchStatus.LOADING
  const timeoutId = setTimeout(() => {
    state.topArticles.status = FetchStatus.COMPLETE
    commit('setTopArticles')
  }, 3000)

  axios.get('http://localhost:8000/api/keywords')
  .then(function (response) {
    clearTimeout(timeoutId)
    let articles = []
    response.data.forEach(article => {
      const entry = state.topArticles.results.find(entry => {
        return entry.id === article.id
      })

      if (!entry) {
        articles.push(article)
      }
    })
    state.topArticles.status = FetchStatus.COMPLETE
    commit('setTopArticles', articles)
  })
  .catch(function (error) {
    console.log(error)
  })
}

export const addArticleById = ( { commit, state }, id ) => {
  return new Promise((resolve, reject) => {
    state.articles.status = FetchStatus.LOADING
    const article = state.articles.results.find(a => {
      return a.id === Number(id)
    })

    if (!article) {
      axios.get(`http://localhost:8000/api/articles/${id}`)
      .then(function (res) {
        state.articles.status = FetchStatus.COMPLETE
        commit('addArticle', res.data)
        resolve()
      })
      .catch(function (error) {
        console.log(error)
        reject()
      })
    } else {
      resolve()
    }


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
  return new Promise((resolve, reject) => {
    state.keywords.status = FetchStatus.LOADING

    const timeoutId = setTimeout(() => {
      state.keywords.status = FetchStatus.COMPLETE
      commit('getKeywords')
      resolve()
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
      resolve()
    })
    .catch(function (error) {
      console.log(error)
      reject()
    })
  })
}

export const getSearchResults = ({ commit, state }, query) => {
  return new Promise ((resolve, reject) => {
    state.search.status = FetchStatus.LOADING
    console.log(query)
    let results = []
    axios.get(`http://localhost:8000/api/keywords/${query}`)
    .then(function (response) {

      response.data.forEach(article => {
        results.push(article)
      })
      state.keywords.status = FetchStatus.COMPLETE
      commit('getSearchResults', results)
      resolve()
    })
    .catch(function (error) {
      console.log(error)
      reject()
    })



  })

}
