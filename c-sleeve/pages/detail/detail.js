// pages/detail/detail.js
import { Spu } from '../../models/spu.js'
import { ShoppingWay } from '../../core/enum.js'
import { SaleExplain } from '../../models/sale-explain.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false,
    orderWay: ShoppingWay.CART,
    specs: null,
    saleExplain: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    const saleExplain = await SaleExplain.getFixed()
    this.setData({
      spu,
      saleExplain
    })
  },

  onSpecChange() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onGotoHome() {
    wx.switchTab({
      url: '/pages/home/home',
    });
  },

  onGotoCart() {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  onAddToCart() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    })
  },

  onBuy() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    })
  },

  onSpecChange(e) {
    this.setData({
      specs: e.detail
    })
  }
})