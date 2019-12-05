import {
  config
} from '../config/config.js'

const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
      func(args);
    });
  };
};

class Http {
  static async request({url, data, method="GET"}){
    const res = await promisic(wx.request)({
        url: config.baseURL + url,
        method,
        data,
        header : {
          appkey: config.appkey
        }
      })
    // console.log(res)
    return res.data
  }
}

export {
  Http
}