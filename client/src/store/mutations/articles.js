/*
 *  Article Mutations
 */

export const addArticles = (state, articles) => {
  articles.forEach(article => state.articles.results.push(article))
}
