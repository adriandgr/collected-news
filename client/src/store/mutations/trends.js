/*
 *  Trends' Mutations
 */

export const setTrends = (state, trends) => {
  state.trends.results = trends;
}

export const setTopKeywords = (state, topKeywords) => {
  state.trends.top = topKeywords;
}
