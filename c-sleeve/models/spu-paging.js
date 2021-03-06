import {
  Paging
} from '../utils/paging.js'

class SpuPaging {
  static getLatestPaging() {
    return new Paging({
      req: {
        url: '/spu/latest'
      },
      count: 5
    })
  }
}

export {
  SpuPaging
}