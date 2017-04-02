export const topArticles = state => state.topArticles
export const articles = state => state.articles

export const getArticleById = (state, getters) => (id) =>
  getters.articles.results.find(article => article.id === Number(id))

export const getSourceById = (state, getters) => (id) => {
  let source = getters.sources.results.find(source => source.Source.id === Number(id))
  return source.Source.name
}

export const paginateSources = (state, getters) => (p) => {
  let page = p * 6 || 0
  return getters.sources.results.filter(source => {
    let pos = getters.sources.results.indexOf(source)
    return (pos >= page && pos < page + 6)
  })
}

export const getSourcePagintation = state => state.sources.pagination

export const articleSentiment = (state, getters) => (id) => {
  const s = Math.ceil(getters.getArticleById(id).sentiment * 1000)
  return (s > 100 || s < -100 ? 100 * (s/Math.abs(s)) : s)
}
export const sources = state => state.sources
export const keywords = state => state.keywords
export const search = state => state.search
