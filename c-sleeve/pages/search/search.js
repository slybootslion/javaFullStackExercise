// pages/search/search.js
import {HistoryKeyword} from "../../models/history-keyword";
import {Tag} from "../../models/tag";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const historyKeyword = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: [],
    hotTags: [],
    items: [],
    search: false
  },

  /**
   * 生命周期函数--监听页面加载
   */ async onLoad(options) {
    const historyTags = historyKeyword.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(e) {
    const keyword = e.detail.value || e.detail.name
    if (!keyword.trim()) {
      showToast('请输入关键字')
      return false
    }
    historyKeyword.save(keyword)
    this.setData({
      historyTags: historyKeyword.get(),
      search: true,
      items: []
    })
    // 调用接口
    wx.lin.showLoading({
      color: '#157658',
      type: 'flash',
      fullScreen: true
    })
    const paging = Search.search(keyword)
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    this.bindItems(data)
  },

  onCancel() {
    this.setData({
      search: false
    })
  },

  bindItems(data) {
    if (data.accumulator.length) {
      this.setData({
        items: data.accumulator
      })
    }
  },

  onDeleteHistory() {
    historyKeyword.clear()
    this.setData({
      historyTags: []
    })
  }
})
