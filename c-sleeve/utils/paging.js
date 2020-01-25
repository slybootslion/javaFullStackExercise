import {
  Http
} from './http.js'

class Paging {

  url // 链接
  start // 起始位置
  count // 分页数量
  locker // 发送请求的锁
  req // 请求数据 {url, method, data}
  moreData = true // 是否有更多数据的判断
  accumulator = [] // 类加的数据

  constructor({
    req,
    start = 0,
    count = 10
  }) {
    this.req = req
    this.url = req.url
    this.start = start
    this.count = count
  }

  // 入口方法
  async getMoreData() {
    if (!this.moreData) return false
    if (!this._getLocker()) return false
    const data = await this._actualGetData()
    this._releaseLocker()
    return data
  }

  // 真实的发送请求
  async _actualGetData() {
    this._getCurrentReq()
    let paging = await Http.request(this.req)
    if (!paging) return null
    if (paging.total === 0) {
      return {
        empty: true,
        items: [], // 当前请求的数据
        moreData: false,
        accumulator: []
      }
    }

    // 有数据
    this.moreData = Paging._morePage(paging.total_page, paging.page)
    if (this.moreData) this.start += this.count
    this._accumulator(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }

  }

  // 处理累加的数据
  _accumulator(items) {
    this.accumulator = this.accumulator.concat(items)
  }

  // 判断是否还有后续数据
  // pageNum从0开始
  static _morePage(totalPage, pageNum) {
    return pageNum < totalPage - 1
  }

  // 对url进行拼接
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&count=${this.count}`

    if (url.includes('?')) {
      url += `&${params}`
    } else {
      url += `?${params}`
    }
    this.req.url = url
  }
  // 获取发送请求的锁状态
  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }
  // 释放请求锁的状态
  _releaseLocker() {
    this.locker = false
  }

}

export {
  Paging
}