/*
 *  Source Mutations
 */


export const setSources = (state, sources) =>
  sources.forEach(source => state.sources.results.push(source))

export const updateSourcePage = (state, pageNum) => {
  state.sources.pagination = pageNum
}
