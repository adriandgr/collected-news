function consts (list) {
  return list.reduce((previous, current) => {
    previous[current] = current
    return previous
  }, {})
}

const Order = consts([
  'CATEGORY',
  'LAST_UPDATE',
  'NAME',
  'SENTIMENT',
])

export default Order
