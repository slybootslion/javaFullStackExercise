// banner业务逻辑
import {
  Http
} from '../utils/http.js'

class Banner {
  static locationB = 'b-1'

  static getHomeLocationB() {
    return Http.request({
      url: `/banner/name/${Banner.locationB}`
    })
  }
}

export {
  Banner
}