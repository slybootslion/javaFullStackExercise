// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: {
      type: Object
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const {
        cell,
        x,
        y
      } = this.properties
      this.triggerEvent('celltap', {
        cell,
        x,
        y
      }, {
        bubbles: true,
        composed: true
      })
    },
  }
})