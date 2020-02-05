// components/realm/index.js
import {
  FenceGroup
} from '../models/fence-group.js'

import {
  Judger
} from '../models/judger.js'

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
    fences: [],
    judger: null,
  },
  observers: {
    spu(spu) {
      if (!spu) return false
      let sku = []
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },
    onCellTap(e) {
      const {
        cell,
        y,
        x
      } = e.detail
      const {
        judger
      } = this.data
      judger.judge(cell, x, y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})