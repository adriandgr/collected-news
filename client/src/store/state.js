import FetchStatus from './constants/fetch-status'
import Order from './constants/order'

import lunr from 'lunr'

export const state = {
  topArticles: {
    status: FetchStatus.INIT,
    pagination: 0,
    filter: ['u s', 's amp p', 'wasn', 'wouldn', 'http www sportbible', 'world', 'years ago'],
    busy: false,
    neverLoaded: true,
    results: []
  },
  articles: {
    status: FetchStatus.INIT,
    results: []
  },
  sources: {
    status: FetchStatus.INIT,
    filter: [],
    order: 'avg_sentiment',
    sortAsc: false,
    pagination: 0,
    results: []
  },
  keywords: {
    status: FetchStatus.INIT,
    results: []
  },
  topKeywords: {
    results: []
  },
  lunr: {
    status: 0,
    loading: FetchStatus.INIT,
    idx: lunr(function () {
      this.field('title', { boost: 10 })
      this.field('snippet')
      this.field('author')
    }),
    docs: []
  },
  keyLunr: {
    status: FetchStatus.INIT,
    idx: lunr(function () {
      this.field('title', { boost: 10 })
      this.field('snippet')
    })
  },
  keywordSearch: {
    status: FetchStatus.INIT,
    results: []
  },
  trends: {
    results: [],
  }
}
