// category业务逻辑
import {
  Http
} from '../utils/http.js'

class Category {

  static getHomeLocationC() {
    return Http.request({
      url: `/category/grid/all`
    })
  }
}

export {
  Category
}