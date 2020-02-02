// banner业务逻辑
import {
  Http
} from '../utils/http.js'

class Banner {
  static locationB = 'b-1'
  static locationG = 'b-2'

  static getHomeLocationB() {
    return Http.request({
      url: `/banner/name/${Banner.locationB}`
    })
  }

  static getHomeLocationG() {
    return Http.request({
      url: `/banner/name/${Banner.locationG}`
    })
  }
}

export {
  Banner
}