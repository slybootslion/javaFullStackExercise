import {
  SkuCode
} from './sku-code.js'

import {
  SkuPending
} from './sku-pending.js'

import {
  Joiner
} from '../../utils/joiner.js'

import {
  CellStatus
} from '../../core/enum.js'

class Judger {
  fenceGroup
  pathDict = []
  skuPending

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this._initPathDict()
    this._initSkuPending()
  }

  // sku是否全部选择
  isSkuIntact() {
    return this.skuPending.isIntact()
  }

  _initSkuPending() {
    const specLength = this.fenceGroup.fences.length
    this.skuPending = new SkuPending(specLength)
    const defaultSku = this.fenceGroup.getDefaultSku()
    if (!defaultSku) return false
    this.skuPending.init(defaultSku)
    this._initSelectedCell()
    this.judge(null, null, null, true)
  }

  _initSelectedCell() {
    this.skuPending.pending.forEach(cell => {
      this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
    })
  }

  _initPathDict() {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code)
      this.pathDict = [...this.pathDict, ...skuCode.totalSegments]
    })
  }

  judge(cell, x, y, isInit = false) {
    if (!isInit) {
      this._changeCurrentCellStatus(cell, x, y)
    }
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPotentialPath(cell, x, y)
      if (!path) return false // 路径不存在直接推出当前次判断
      const isIn = this._isInDict(path) // 路径是否在商品编码的字典中
      if (isIn) {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
      } else {
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
      }
    })
  }

  _isInDict(path) {
    return this.pathDict.includes(path)
  }

  _findPotentialPath(cell, x, y) {
    const joiner = new Joiner('#')
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.skuPending.findSelectedCellByX(i) // 查找每一行选中Cell
      if (x === i) {
        // 当前行
        // 已选中不加入路径拼接，如果有其他选中进入下一行
        if (this.skuPending.isSelected(cell, x)) return false
        // 其他未选中加入路径拼接
        const cellCode = this._getCellCode(cell.spec)
        joiner.join(cellCode)
      } else {
        // 其他行
        if (selected) { // 选中元素
          const selectedCellCode = this._getCellCode(selected.spec)
          joiner.join(selectedCellCode)
        }
      }
    }
    return joiner.getStr()
  }

  _getCellCode(spec) {
    return spec.key_id + '-' + spec.value_id
  }

  _changeCurrentCellStatus(cell, x, y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
      this.skuPending.insertCell(cell, x)
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
      this.skuPending.removeCell(x)
    }
  }
}

export {
  Judger
}