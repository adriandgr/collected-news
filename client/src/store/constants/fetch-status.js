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

FetchStatus.APP_DOMAIN = 'http://localhost:8000'

export default FetchStatus
