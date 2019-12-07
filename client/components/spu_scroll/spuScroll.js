// components/spu-scroll/spu-scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    theme: Object,
    supList: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    ready() {
      console.log(this.data.theme)
      console.log(this.data.supList)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})