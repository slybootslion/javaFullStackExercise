class Paging {

  url
  start
  count
  locker
  req

  constructor({
    req,
    start = 0,
    count = 10
  }) {
    this.req = req
    this.url = req.url
    this.start = start
    this.locker = locker
  }

  // 入口方法
  getMoreData() {
    if (this._getLocker()) return false
    this._actualGetData()
    this._releaseLocker()
  }

  // 真实的发送请求
  _actualGetData() {

  }

  // 对url进行拼接
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`

    if (url.indexOf('?') !== -1) {
      url += `&${params}`
    } else {
      url += `?${params}`
    }
    this.req.url = url
  }

  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }

  _releaseLocker() {
    this.locker = false
  }

}

export {
  paging
}