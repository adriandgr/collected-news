export const setTopArticles = (state, articles) => {
  articles.forEach(article =>{
    state.topArticles.results.push(article)
  })
}

export const incrementKeywordPage = state => {
  state.topArticles.pagination++
  //console.log('incremented pagination:', state.topArticles.pagination)
}

export const addArticle = (state, article) => {
  state.articles.results.push(article)
}

export const setSources = (state, sources) => {
  state.sources.results = sources;
}
export const getKeywords = state => {
  state.keywords
}
export const setTrends = (state, trends) => {
  state.trends.results = trends;
}
export const getSearchResults = (state, results) => {
  state.search.results = results
}

export const updateSourcePage = (state, pageNum) => {
  state.sources.pagination = pageNum
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
