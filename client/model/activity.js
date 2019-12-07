/**
 * 优惠券
 */

import {
  Http
} from '../utils/http.js'

class Activity {

  static activityNames = 'a-2'

  // 主页优惠券 
  static async homeActivity() {
    return await Http.request({
      url: '/activity/name/' + Activity.activityNames
    })
  }
}

export {
  Activity
}