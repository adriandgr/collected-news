export const topArticles = state => state.topArticles
export const articles = state => state.articles

export const getArticleById = (state, getters) => (id) =>
  getters.articles.results.find(article => article.id === Number(id))

export const getSourceById = (state, getters) => (id) => {
  let source = getters.sources.results.find(source => source.id === Number(id))
  return source.name
}

export const paginateSources = (state, getters) => (p) => {
  let page = p * 6 || 0
  return getters.sources.results.filter(source => {
    let pos = getters.sources.results.indexOf(source)
    return (pos >= page && pos < page + 6)
  })
}

export const getSourcePagintation = state => state.sources.pagination

export const letterGrader = state => (sentiment) => {

  let adjusted = Math.ceil(sentiment*1000) + 50

  if (adjusted >= 98) {
    return 'A+'
  } else if (adjusted >= 95) {
    return 'A'
  } else if (adjusted >= 90) {
    return 'A-'
  } else if (adjusted >= 85) {
    return 'B+'
  } else if (adjusted >= 80) {
    return 'B'
  } else if (adjusted >= 70) {
    return 'B-'
  } else if (adjusted >= 60) {
    return 'C+'
  } else if (adjusted >= 50) {
    return 'C'
  } else if (adjusted >= 40) {
    return 'C-'
  } else if (adjusted >= 10) {
    return 'D'
  }
  return 'F'
}

export const articleSentiment = (state, getters) => (id) => {
  const s = Math.ceil(getters.getArticleById(id).sentiment * 1000)
  return (s > 100 || s < -100 ? 100 * (s/Math.abs(s)) : s)
}
export const sources = state => state.sources
export const keywords = state => state.keywords
export const search = state => state.search

export const trends = state => state.trends
