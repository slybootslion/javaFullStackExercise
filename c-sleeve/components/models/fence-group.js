import { Fence } from './fence.js';
import { Matrix } from './matrix.js';

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  getDefaultSku() {
    const deafultSkuId = this.spu.default_sku_id
    if (!deafultSkuId) return false
    return this.skuList.find(i => i.id === deafultSkuId)
  }

  getSku(skuCode) {
    const fullSkuCode = this.spu.id + '$' + skuCode
    const sku = this.spu.sku_list.find(sku => sku.code === fullSkuCode)
    return sku ? sku : null
  }

  setCellStatusById(cellId, status) {
    this.eachCell((cell) => {
      if (cellId === cell.id) cell.status = status
    })
  }

  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    AT.forEach(row => {
      const fence = new Fence(row)
      fence.init()
      // 判断是否有可视规格，如果有进行可视规格的数据绑定
      if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
        fence.setFenceSketch(this.skuList)
      }
      fences.push(fence)
    })
    this.fences = fences
    console.log(fences)
  }

  // 是否有可视规格
  _hasSketchFence() {
    return this.spu.sketch_spec_id ? true : false
  }

  // 是否为可视规格的fence
  _isSketchFence(fenceId) {
    return this.spu.sketch_spec_id === fenceId
  }

  // 遍历每一个cell，返回当前cell以及所处的行数、列数
  eachCell(cb) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        const cell = this.fences[i].cells[j]
        cb(cell, i, j)
      }
    }
  }

  _createMatrix(skuList) {
    const m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }
}

export {
  FenceGroup
}