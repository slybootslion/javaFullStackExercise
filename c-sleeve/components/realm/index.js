// components/realm/index.js
import { FenceGroup } from '../models/fence-group.js'
import { Judger } from '../models/judger.js'
import { Spu } from '../../models/spu.js'
import { Cell } from '../models/cell.js'
import { Cart } from '../../models/cart.js'

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
    noSpec: false,
    skuIntact: false,
    currentValues: '',
    missingKeys: '',
    currentSkuCount: Cart.SKU_MIN_COUNT,
    outStock: false, // 是否缺货
  },
  observers: {
    spu(spu) {
      if (!spu) return false
      if (Spu.isNoSpec(spu)) {
        // 判断商品是否为单品
        this.processNoSpec(spu)
      } else {
        // 否则该商品为有单品可选择情况
        this.processHasSpec(spu)
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.bindSkuData(spu.sku_list[0])
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
      this.setData({
        noSpec: true
      })
    },
    processHasSpec(spu) {
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
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },
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
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      })
    },
    bindTipData() {
      const skuIntact = this.data.judger.isSkuIntact()
      const currentValues = this.data.judger.getCurrentValues()
      const missingKeys = this.data.judger.getMissingKeys()
      this.setData({
        skuIntact,
        currentValues,
        missingKeys
      })
    },
    setStockStatus(stock, currentCount) { // 修改是否缺货的状态
      const outStock = this.isOutOfStock(stock, currentCount)
      this.setData({
        outStock
      })
    },
    isOutOfStock(stock, currentCount) { // 判断库存和用户选择数量
      return stock < currentCount
    },
    onSelectCount(e) {
      const currentCount = e.detail.count
      this.data.currentSkuCount = currentCount
      if (this.data.judger.isSkuIntact()) {
        const sku = this.data.judger.getDeterminateSku()
        this.setStockStatus(sku.stock, currentCount)
      }
    },
    onCellTap(e) {
      const { cell: data, y, x } = e.detail
      const { judger } = this.data
      const cell = new Cell(data.spec)
      cell.status = data.status
      judger.judge(cell, x, y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        this.bindSkuData(currentSku)
        this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
    }
  }
})