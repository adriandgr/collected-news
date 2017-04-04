import FetchStatus from './constants/fetch-status'
import lunr from 'lunr'

export const state = {
  topArticles: {
    status: FetchStatus.INIT,
    pagination: 0,
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
    pagination: 0,
    results: []
  },
  keywords: {
    status: FetchStatus.INIT,
    results: []
  },
  lunr: {
    status: 0,
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
    top: []
  }
}
