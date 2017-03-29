function consts (list) {
  return list.reduce((previous, current) => {
    previous[current] = current
    return previous
  }, {})
}

const FetchStatus = consts([
  'INIT',
  'LOADING',
  'COMPLETE'
])

export default FetchStatus
