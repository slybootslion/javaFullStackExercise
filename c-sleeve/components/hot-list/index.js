// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: {
      type: Object
    }
  },

  observers: {
    banner(b) {
      if (!b.items || !b.items.length) return false;
      const left = b.items.find(i => i.name === 'left')
      const rightTop = b.items.find(i => i.name === 'right-top')
      const rightBottom = b.items.find(i => i.name === 'right-bottom')
      this.setData({
        left,
        rightTop,
        rightBottom,
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    left: null,
    rightTop: null,
    rightBottom: null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})