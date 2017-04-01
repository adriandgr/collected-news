export const setTopArticles = (state, articles) => {
  articles.forEach(article =>{
    state.topArticles.results.push(article)
  })
}

export const addArticle = (state, article) => {
  state.articles.results.push(article)
}

export const getSources = state => {
  state.sources
}
export const getKeywords = state => {
  state.keywords
}
export const getSearchResults = (state, results) => {
  state.search.results = results
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
