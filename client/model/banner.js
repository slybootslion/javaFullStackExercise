import {
  Http
} from '../utils/http.js'

class Banner {
  static async homeBanner() {
    const bannerParams = 'b-1'
    return await Http.request({
      url: '/banner/name/' + bannerParams,
    })
  }
}

export {
  Banner
}