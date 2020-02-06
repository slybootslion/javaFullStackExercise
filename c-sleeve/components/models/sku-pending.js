class SkuPending {
  pending = []

  constructor() {}

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