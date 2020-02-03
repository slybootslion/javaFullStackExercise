import {
  Matrix
} from './matrix.js'

import {
  Fence
} from './fence.js'

class FenceGroup {
  spu
  skuList = []

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
    console.log(fences)
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