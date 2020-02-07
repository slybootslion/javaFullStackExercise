// components/realm/index.js
import {
  FenceGroup
} from '../models/fence-group.js'

import {
  Judger
} from '../models/judger.js'

import {
  Spu
} from '../../models/spu.js'

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
    previewImg: '',
    title: '',
    price: 0,
    discountPrice: 0,
    stock: 0,
    noSpec: false
  },
  observers: {
    spu(spu) {
      if (!spu) return false
      // 判断商品是否为单品
      if (Spu.isNoSpec(spu)) {
        this.bindSkuData(spu.sku_list[0])
        this.setData({
          noSpec: true
        })
        return false
      }

      // 否则该商品为有单品可选择情况
      let sku = []
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      const defaultSku = fenceGroup.getDefaultSku()
      if (!defaultSku) {
        this.bindSpuData()
      } else {
        this.bindSkuData(defaultSku)
      }
      this.bindInitData(fenceGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price
      })
    },
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock
      })
    },
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