class HistoryKeyword {
  static MAX_ITEM_COUNT = 20
  static KEY = 'keywords'
  keywords = []

  constructor() {
    if (typeof HistoryKeyword.instance === 'object') return HistoryKeyword.instance
    HistoryKeyword.instance = this
    this.keywords = this._getLocalKeywords()
    return this
  }

  save(keyword) {
    const item = this.keywords.filter(k => k === keyword)
    if (item.length !== 0) return false
    if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      this.keywords.pop()
    }
    this.keywords.unshift(keyword)
    this._refreshLocal(keyword)
  }

  get() {
    return this.keywords
  }

  clear() {
    this.keywords = []
    this._refreshLocal()
  }

  _refreshLocal(keyword) {
    wx.setStorageSync(HistoryKeyword.KEY, this.keywords)
  }

  _getLocalKeywords() {
    const keywords = wx.getStorageSync(HistoryKeyword.KEY)
    if (!keywords) {
      this._refreshLocal()
      return []
    }
    return keywords
  }
}

export {
  HistoryKeyword
}
