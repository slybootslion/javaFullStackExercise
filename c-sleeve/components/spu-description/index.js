// components/spu-description/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: []
  },

  observers: {
    spu(spu) {
      if (!spu || !spu.tags) return false
      const tags = spu.tags.split('$')
      this.setData({
        tags
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
