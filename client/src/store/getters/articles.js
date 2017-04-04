/*
 *  Article Getters
 */

export const articles = state => state.articles

export const articleById = (state, getters) => (id) =>
getters.articles.results.find(article => article.id === Number(id))

export const articlesBySourceId = (state, getters) => (id) =>
getters.articles.results.filter(article => article.sourceId === Number(id))

export const articleSentiment = (state, getters) => (id) => {
  const s = Math.ceil(getters.articleById(id).sentiment * 1000)
  return (s > 100 || s < -100 ? 100 * (s/Math.abs(s)) : s)
}

export const manyArticlesById = (state, getters) => (ids) => {
  let results = []
  ids.forEach(id => {
    results.push(getters.articles.results.find(article => article.id === Number(id)))
  })
  return results
}

