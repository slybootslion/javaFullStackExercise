// theme业务逻辑
import {
  Http
} from '../utils/http.js'

class Theme {

  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemes() {
    const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    this.themes = await Http.request({
      url: '/theme/by/names',
      data: {
        names
      }
    })
  }

  getHomeLocationA() {
    return this.themes.find(i => i.name === Theme.locationA)
  }

  getHomeLocationE() {
    return this.themes.find(i => i.name === Theme.locationE)
  }
}

export {
  Theme
}