/*
 *  Lunr Mutations
 */


export const addLunrArticleDoc = (state, docs) => {
  docs.forEach(doc => {
    state.lunr.docs.push(doc)
  })
}

export const indexLunrArticleDoc = (state, docs) => {
  docs.forEach(doc => {
    state.lunr.idx.add(doc)
  })
}

export const getKeywords = state => {
  state.keywords
}

// TODO replace with lunr store
export const getKeywordSearch = (state, results) => {
  state.keywordSearch.results = results
}

export const indexArticle = (state, article) => {
  state.lunr.idx.add(article)
}
