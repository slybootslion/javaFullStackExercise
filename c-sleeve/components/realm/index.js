// components/realm/index.js
import {
  FenceGroup
} from '../models/fence-group.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    spu(spu) {
      if (!spu) return false
      let sku = []
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})