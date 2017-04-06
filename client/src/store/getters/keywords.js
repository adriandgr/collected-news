/*
 *  Getters for articles by top frequency keyword (homepage view)
 */

export const keywords = state =>
  state.keywords

export const keywordIdByName = (state, getters) => (name) =>
getters.keywords.results.find(keyword => keyword.name === name)

export const topArticles = (state, getters) => {
  return state.topArticles
}

export const topArticlesById = (state, getters) => (id) =>
  getters.topArticles.results.find(article => article.id === Number(id))



export const fileredTopArticles = state => {
  return state.topArticles.results.filter(a => {
    let val = state.topArticles.filter.reduce((p, name) => (name === a.name) || p, false)
    return !val
  })
}
