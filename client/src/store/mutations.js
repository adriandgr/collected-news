export const getArticles = state => {
  state.articles
}
export const getSources = state => {
  state.sources
}
export const getKeywords = state => {
  state.keywords
}
export const getSearchResults = (state, results) => {
  console.log('dispatched a mutation:', results)
  state.searchResults
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
