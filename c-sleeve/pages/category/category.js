// pages/category/category.js
import { getWindowHeightRpx } from "../../utils/system"
import { Categories } from '../../models/categories'
import { SpuListType } from '../../core/enum'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    segHeight: 0,
    roots: [],
    currentSubs: [],
    currentBannerImg: '',
    defaultRootId: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setDynamicSegmentHeight()
    this.initCategoryData()
  },

  async initCategoryData() {
    const categories = new Categories()
    this.data.categories = categories

    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoots(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defaultRoot.img
    })
  },

  getDefaultRoots(roots) {
    let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
    if (!defaultRoot) defaultRoot = roots[0]
    return defaultRoot
  },

  async setDynamicSegmentHeight() {
    const res = await getWindowHeightRpx()
    const segHeight = res - 60 - 20 - 2
    this.setData({
      segHeight
    })
  },

  onSegChange(e) {
    const rootId = e.detail.activeKey
    const currentSubs = this.data.categories.getSubs(rootId)
    const currentRoot = this.data.categories.getRoot(rootId)
    this.setData({
      currentSubs,
      currentBannerImg: currentRoot.img
    })
  },

  onJumpToSpuList(e) {
    const cid = e.detail.cid
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },

  onGotoSearch(e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
