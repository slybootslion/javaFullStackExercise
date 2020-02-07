import { Cell } from './cell.js'
import { Joiner } from '../../utils/joiner.js'

class SkuPending {
  pending = []
  size

  constructor(size) {
    this.size = size
  }

  init(sku) {
    sku.specs.forEach((i, idx) => {
      const cell = new Cell(i)
      this.insertCell(cell, idx)
    })
  }

  getCurrentSpecValues() {
    const value = this.pending.map(cell => cell ? cell.spec.value : null)
    return value
  }

  getMissingSpecKeysIndex() {
    const keysIndex = []
    for (let i = 0; i < this.size; i++) {
      if (!this.pending[i]) keysIndex.push(i)
    }
    return keysIndex
  }

  getSkuCode() {
    const joiner = new Joiner('#')
    this.pending.forEach(cell => {
      const cellCode = Cell.getCellCode(cell.spec)
      joiner.join(cellCode)
    })
    return joiner.getStr()
  }

  isIntact() {
    for (let i = 0; i < this.size; i++) {
      if (this._isEmptyPart(i)) return false
    }
    return true
  }

  _isEmptyPart(idx) {
    return !this.pending[idx]
  }

  // x是行号
  insertCell(cell, x) {
    this.pending[x] = cell
  }

  removeCell(x) {
    this.pending[x] = null
  }

  findSelectedCellByX(x) {
    return this.pending[x]
  }

  isSelected(cell, x) {
    const pendingCell = this.pending[x]
    if (!pendingCell) return false // 如果没有选中，直接返回
    return cell.id === pendingCell.id // 判断当期cell与选中cell的id是否相同
  }
}

export {
  SkuPending
}