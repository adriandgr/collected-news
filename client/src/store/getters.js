export const topArticles = state => state.topArticles
export const articles = state => state.articles

export const getArticleById = (state, getters) => (id) => {
  const article = getters.articles.results.find(article => {
    return article.id === Number(id)
  })
  return article
}

export const paginateSources = (state, getters) => (p) => {
  let page = p * 6 || 0
  const limitSources = getters.sources.results.filter(source => {
    let pos = getters.sources.results.indexOf(source)
    return (pos >= page && pos < page + 6)
  })
  return limitSources
}

export const getSourcePagintation = state => state.sources.pagination

export const articleSentiment = (state, getters) => (id) => {
  const s = Math.ceil(getters.getArticleById(id).sentiment * 1000)
  return (s > 100 || s < -100 ? 100 * (s/Math.abs(s)) : s)
}
export const sources = state => state.sources
export const keywords = state => state.keywords
export const search = state => state.search
