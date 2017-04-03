export const setTopArticles = (state, articles) => {
  let count = 0
  articles.forEach(article =>{
    state.topArticles.results.push(article)
    count++
  })
  console.log('>>> added', count)
}

export const incrementKeywordPage = state => {
  state.topArticles.pagination++
  console.log('incremented pagination:', state.topArticles.pagination)
}

export const toggleInfinitScroll = state => {
  state.topArticles.busy = !state.topArticles.busy
}

export const addArticles = (state, articles) => {
  articles.forEach(article => state.articles.results.push(article))
}

export const setSources = (state, sources) =>
  sources.forEach(source => state.sources.results.push(source))

export const getKeywords = state => {
  state.keywords
}
export const getSearchResults = (state, results) => {
  state.search.results = results
}

export const updateSourcePage = (state, pageNum) => {
  state.sources.pagination = pageNum
}

export const indexArticle = (state, article) => {
  state.lunr.idx.add(article)
}

// getresults () {
//       this.keywords.forEach( keyword => {

//         if (keyword.name == this.$route.params.id.toLowerCase()) {
//           axios.get(`http://localhost:8000/api/articles/${keyword.id}`)
//           .then(function (response) {
//             response.data.forEach(article => {
//               console.log(article)
//                 this.results.push(article)
//               })
//             })

//           .catch(function (error) {
//             console.log(error)
//           })
//         }
//       })
//       return results
//     }
