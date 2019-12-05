import {Http} from '../utils/http.js'

class Category {
  static async homeGrid() {
    return await Http.request({
      url: '/category/grid/all'
    })
  }
}

export {
  Category
}