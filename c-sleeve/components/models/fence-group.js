import {
  Matrix
} from './matrix.js'

import {
  Fence
} from './fence.js'

class FenceGroup {
  spu
  skuList = []
  fences = []

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList)
    const fences = []
    const AT = matrix.transpose()
    AT.forEach(row => {
      const fence = new Fence(row)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
  }

  // 便利每一个cell，返回当前cell以及所处的行数、列数
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