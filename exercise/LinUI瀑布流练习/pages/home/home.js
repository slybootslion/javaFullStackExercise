// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData() {
    wx.request({
      url: 'http://se.7yue.pro/v1/spu/latest',
      method: 'GET',
      header: {
        appkey: 'YYnRnGHl86NFBoJb'
      },
      success: (res) => {
        this.setData({
          list: res.data.items
        })
        this.setWaterflowData()
      }
    })
  },
  setWaterflowData() {
    const {list} = this.data
    wx.lin.renderWaterFlow(list, false, () => {
      console.log('渲染成功')
    })
  }
})