/*
 *  Source Mutations
 */


export const setSources = (state, sources) =>
  sources.forEach(source => state.sources.results.push(source))

export const updateSourcePage = (state, pageNum) => {
  state.sources.pagination = pageNum
}

export const toggleSourceFilter = (state, sourceId) => {
  state.sources.filter.push(sourceId)
}

export const toggleSourceSort = state => {
  state.sources.sortAsc = !state.sources.sortAsc
}

export const setSourceOrder = (state, order) =>{
  state.sources.order = order
}
