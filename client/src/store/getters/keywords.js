/*
 *  Articles by top frequency keyword (homepage view)
 */

export const keywords = state => state.keywords

export const topArticles = state => state.topArticles
export const topArticlesById = (state, getters) => (id) => getters.topArticles.results.find(article => article.id === Number(id))

