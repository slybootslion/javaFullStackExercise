import {
  config
} from '../config/config.js'

import {
  promisic
} from '../utils/util.js'

class Http {
  static async request({
    url,
    data,
    method = 'GET'
  }) {
    const res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      method,
      data,
      header: {
        appkey: config.appkey
      }
    })

    return res.data
  }
}

export {
  Http
}