import {
  Http
} from '../utils/http.js'

class Theme {
  static name1 = 't-1'
  static name2 = 't-2'
  static name3 = 't-3'
  static name4 = 't-4'

  themes = []

  async homeThemes() {
    const names = `${Theme.name1},${Theme.name2},${Theme.name3},${Theme.name4}`
    this.themes = await Http.request({
      url: '/theme/by/names',
      data: {
        names
      }
    })
  }

  homeThemeA() {
    return this.themes.find(t => t.name === Theme.name1)
  }

  homeThemeB() {
    return this.themes.find(t => t.name === Theme.name2)
  }

  homeThemeC() {
    return this.themes.find(t => t.name === Theme.name3)
  }

  homeThemeD() {
    return this.themes.find(t => t.name === Theme.name4)
  }

  static getThemeBSpu() {
    return Theme.getThemeSpuByName(Theme.name2)
  }

  static getThemeSpuByName(name) {
    return Http.request({
      url: `/theme/name/${name}/with_spu`
    })
  }
}

export {
  Theme
}