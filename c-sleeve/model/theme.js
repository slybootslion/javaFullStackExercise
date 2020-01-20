// theme业务逻辑
import {
  Http
} from '../utils/http.js'

class Theme {
  static getHomeLocationA() {
    return Http.request({
      url: '/theme/by/names',
      data: {
        names: 't-1'
      }
    })
  }
}

export {
  Theme
}