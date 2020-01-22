// pages/home/home.js

import {
  config
} from '../../config/config.js'

import {
  Theme
} from '../../model/theme.js'

import {
  Banner
} from '../../model/banner.js'

import {
  Category
} from '../../model/category.js'

import {
  Activity
} from '../../model/activity.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    themeF: null,
    themeESpu: [],
    bannerB: null,
    grid: [],
    activityD: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAllData()
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = theme.getHomeLocationA()
    const themeE = theme.getHomeLocationE()
    const themeF = theme.getHomeLocationF()
    let themeESpu = []
    if (themeE.online) {
      // 带有spu信息的主题
      themeESpu = (await Theme.getHomeLocationESpu()).spu_list.slice(0, 8)
    }

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    this.setData({
      themeA,
      themeE,
      themeF,
      themeESpu,
      bannerB,
      grid,
      activityD
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})