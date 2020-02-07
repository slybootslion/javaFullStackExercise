import {
  Matrix
} from './matrix.js'

import {
  Fence
} from './fence.js'

import {
  CellStatus
} from '../../core/enum.js'

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