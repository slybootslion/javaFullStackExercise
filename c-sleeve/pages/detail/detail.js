// pages/detail/detail.js
import { Spu } from '../../models/spu.js'
import { ShoppingWay } from '../../core/enum.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false,
    orderWay: ShoppingWay.CART
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    // console.log(spu)
    this.setData({
      spu
    })
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
})