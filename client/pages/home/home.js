// pages/home/home.js
import {
  Theme
} from '../../model/theme.js'
import {
  Banner
} from '../../model/banner.js'
import {
  Category
} from '../../model/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeThemeA: null,
    homeBanner: null,
    homeGrid: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.initAllData()
  },

  async initAllData() {
    const homeThemeA = (await Theme.homeThemeA())[0]
    const homeBanner = (await Banner.homeBanner()).items
    const homeGrid = await Category.homeGrid()

    this.setData({
      homeThemeA,
      homeBanner,
      homeGrid
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})