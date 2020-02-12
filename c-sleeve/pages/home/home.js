// pages/home/home.js
import { Theme } from '../../models/theme.js'

import { Banner } from '../../models/banner.js'

import { Category } from '../../models/category.js'

import { Activity } from '../../models/activity.js'

import { SpuPaging } from '../../models/spu-paging.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeH: null,
    themeESpu: [],
    bannerB: null,
    bannerG: null,
    grid: [],
    activityD: null,
    spuPaging: null, // 加载页面类的对象
    loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAllData()
    this.initBottomSpuList()
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    const themeF = theme.getHomeLocationF()
    const themeH = theme.getHomeLocationH()
    let themeESpu = []
    if (themeE.online) {
      // 带有spu信息的主题
      themeESpu = (await Theme.getHomeLocationESpu()).spu_list.slice(0, 8)
    }

    const bannerB = await Banner.getHomeLocationB()
    const bannerG = await Banner.getHomeLocationG()

    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    this.setData({
      themeA,
      themeE,
      themeF,
      themeH,
      themeESpu,
      bannerB,
      bannerG,
      grid,
      activityD
    })
  },

  initBottomSpuList() {
    const spuPaging = SpuPaging.getLatestPaging()
    this.data.spuPaging = spuPaging
    this._renderWaterFlow()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this._renderWaterFlow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async _renderWaterFlow() {
    const {
      spuPaging
    } = this.data
    const data = await spuPaging.getMoreData()
    if (!data) return false
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  }
})
