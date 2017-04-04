/*
 *  Lunr Search Helper Getters
 */

export const keywordSearch = state => state.keywordSearch

export const articleSearch = (state, getters) => (query) => {
  const res = state.lunr.idx.search(query)
  if (!res) {
    return
  }
  let ids = []
  res.forEach(hit => {
    ids.push(hit.ref)
  })
  if (ids.length > 20) {
    ids = ids.slice(0, 20)
  }
  return ids
}


export const lunr = (state) => state.lunr
export const formatArticleDocById = (state, getters) => (id) => {
  const article = {}
  const ref = getters.articleById(id)
  const content = JSON.parse(ref.content).join(" ")
  article.id = ref.id
  article.title = ref.title
  article.snippet = ref.snippet
  article.content = content

  return article
}

