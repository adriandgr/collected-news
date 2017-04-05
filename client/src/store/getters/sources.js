/*
 *  Source Getters
 */
import Order from '../constants/order'
import _ from 'lodash'

export const sources = state => state.sources
export const sourceById = (state, getters) => (id) => {
  let source = getters.sources.results.find(source => source.id === Number(id))
  return source
}

export const fileredSources = state => {
  return state.sources.results.filter(s => {
    let val = state.sources.filter.reduce((p, id) => (id === s.id) || p, false)
    return !val
  })
}

export const orderedSources = state => {
  return _.orderBy(state.sources.results, [state.sources.order, 'name'], [state.sources.sortAsc ? 'asc' : 'desc', 'asc'])
}

export const paginateSources = (state, getters) => (p) => {
  let page = p * 6 || 0

  return getters.orderedSources.filter(source => {
    let pos = getters.orderedSources.indexOf(source)
    // TODO, take out sources when 'last update' is unknown
    return (pos >= page && pos < page + 6)
  })

}

export const sourcePagintation = state => state.sources.pagination

export const sourceNumPages = state =>
  Math.ceil(state.sources.results.length / 6)


export const letterGrader = state => (sentiment) => {
  let adjusted = Math.ceil(sentiment*1000) + 50
  if (adjusted >= 98) {
    return 'A+'
  } else if (adjusted >= 95) {
    return 'A'
  } else if (adjusted >= 90) {
    return 'A-'
  } else if (adjusted >= 85) {
    return 'B+'
  } else if (adjusted >= 80) {
    return 'B'
  } else if (adjusted >= 70) {
    return 'B-'
  } else if (adjusted >= 60) {
    return 'C+'
  } else if (adjusted >= 50) {
    return 'C'
  } else if (adjusted >= 40) {
    return 'C-'
  } else if (adjusted >= 10) {
    return 'D'
  }
  return 'F'
}
