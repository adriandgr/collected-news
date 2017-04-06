/*
 *  Trends and Analytics Helper Getters
 */

export const trends = state => state.trends

export const topKeywords = state => state.topKeywords.results

export const fileredTopKeywords = state => {
  return state.topKeywords.results.filter(k => {
    let val = state.topArticles.filter.reduce((p, name) => (name === k.keyword) || p, false)
    return !val
  })
}
