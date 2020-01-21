import {
  Http
} from '../utils/http.js'

class Activity {
  static locationB = 'a-2'

  static getHomeLocationD() {
    return Http.request({
      url: `/activity/name/${Activity.locationB}`
    })
  }
}

export {
  Activity
}