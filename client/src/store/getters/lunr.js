/*
 *  Lunr Search Helper Getters
 */

export const search = state => state.search

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

