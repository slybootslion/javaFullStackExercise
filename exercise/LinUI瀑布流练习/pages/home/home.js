// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    picUrl: '',
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData() {
    const baseURL = 'http://se.7yue.pro/v1'
    const appkey = 'YYnRnGHl86NFBoJb'
    wx.request({
      url: baseURL + '/spu/latest',
      method: 'GET',
      header: {
        appkey
      },
      success: (res) => {
        this.setData({
          list: res.data.items
        })
        this.setWaterflowData()
      }
    })
    wx.request({
      url: baseURL + '/theme/by/names',
      data: {
        names: 't-4'
      },
      header: {
        appkey
      },
      success: (res) => {
        console.log(res)
        wx.getImageInfo({
          src: res.data[0].internal_top_img,
          success: (res) => {
            console.log(res)
            this.setData({
              height: res.height + 'rpx'
            })
          }
        })

        this.setData({
          picUrl: res.data[0].internal_top_img
        })
      }
    })
  },
  setWaterflowData() {
    const {
      list
    } = this.data
    wx.lin.renderWaterFlow(list, false, () => {
      console.log('渲染成功')
    })
  }
})