// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      width: 0,
      height: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: []
  },

  observers: {
    data(d) {
      if (!d || !d.tags) return false
      const tags = d.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(e) {
      const {
        width,
        height
      } = e.detail
      this.setData({
        width: 340,
        height: 340 * height / width
      })
    },
    onItemTap(e) {
      const pid = e.currentTarget.dataset.pid
      wx.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`,
      })
    }
  }
})