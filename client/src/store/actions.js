import axios from 'axios'
import lunr from 'lunr'
import FetchStatus from './constants/fetch-status'

const HOST_A = 'http://10.10.41.105:8000'
const HOST_B = 'http://localhost:8000'

export const setTopKeywordArticles = ({ commit, state, getters }) =>
  new Promise((resolve, reject) => {
    state.topArticles.status = FetchStatus.LOADING
    const timeoutId = setTimeout(() => {
      state.topArticles.status = FetchStatus.COMPLETE
      commit('setTopArticles')
      resolve()
    }, 3000)
    axios.get(`${HOST_B}/api/keywords?p=${state.topArticles.pagination}`)
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

export const retrieveTrends = ({ commit, state}, keywords) => {
  axios.get(`${HOST_A}/api/keywords/trends`)
    .then(trends => commit('setTrends', trends))
    .catch(err => console.error(err));
};

export const addArticleById = ( { commit, state }, id ) =>
  new Promise((resolve, reject) => {
    state.articles.status = FetchStatus.LOADING
    if (!state.articles.results.find(a => a.id === Number(id))) {
      axios.get(`${HOST_B}/api/articles/${id}`)
      .then(res => {
        state.articles.status = FetchStatus.COMPLETE
        commit('addArticles', [res.data])
        resolve()
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

    axios.get(`${HOST_B}/api/sources/${id}`)
      .then(response => {
        state.articles.status = FetchStatus.COMPLETE
        commit('addArticles', response.data.filter(article =>
          !getters.articleById(article.id)))
        resolve('Added new articles')
      })
      .catch(error => reject(error))
  })

export const updateSourcePage = ({ commit, state }, pageNum) => {
  commit('updateSourcePage', pageNum)
}

export const setSources = ({ commit, state }) =>
  new Promise((resolve, reject) => {
    state.sources.status = FetchStatus.LOADING
    axios.get(`${HOST_B}/api/sources`)
      .then(function (response) {
        let sources = []
        response.data.forEach(source => {
          const entry = state.sources.results.find(entry => {
            return entry.id === source.id
          })
          if (!entry) {
            sources.push(source)
          }
        })
        state.sources.status = FetchStatus.COMPLETE
        resolve(commit('setSources', sources))
      })
      .catch(function (error) {
        console.log(error)
      })
  })


export const getKeywords = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    state.keywords.status = FetchStatus.LOADING

    const timeoutId = setTimeout(() => {
      state.keywords.status = FetchStatus.COMPLETE
      commit('getKeywords')
      resolve()
    }, 3000)

    axios.get(`${HOST_A}/api/keywords/all`)
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
    axios.get(`${HOST_A}/api/keywords/${query}`)
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
