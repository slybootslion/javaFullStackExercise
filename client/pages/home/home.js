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
import {
  Activity
} from '../../model/activity.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeThemeA: null,
    homeBanner: null,
    homeGrid: [],
    homeActivity: null,
    homeThemeB: null,
    homeThemeBSpuList: null,
    homeThemeC: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.initAllData()
  },

  async initAllData() {
    const theme = new Theme()
    await theme.homeThemes()
    const homeThemeA = theme.homeThemeA()
    const homeBanner = (await Banner.homeBanner()).items
    const homeGrid = await Category.homeGrid()
    const homeActivity = await Activity.homeActivity()
    const homeThemeB = theme.homeThemeB()
    const homeThemeC = theme.homeThemeC()
    let homeThemeBSpuList
    if (homeThemeB.online) {
      homeThemeBSpuList = (await Theme.getThemeBSpu()).spu_list.slice(0, 7)
    }
    // console.log(homeThemeC)

    this.setData({
      homeThemeA,
      homeBanner,
      homeGrid,
      homeActivity,
      homeThemeB,
      homeThemeBSpuList,
      homeThemeC
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